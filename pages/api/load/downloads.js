import _ from 'lodash';
import moment from 'moment';
const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';
import {apiWrapper} from 'helpers';
import getConfig from 'next/config';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {ModashRepo} from 'repositories';

const {serverRuntimeConfig} = getConfig();
const baseUrl = `${serverRuntimeConfig.modashUrl}`;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await downloadInfluencers();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }


  async function downloadInfluencers() {
    console.log(`/api/load/download`);

    const {type, lists} = req.body;

    try {
      let ret = false, report;
      let downcnt = 0, url = '', failed = [];
      console.log("***Get influencer lists(" + type + ") from Modash***");
      console.log("***Started(" + moment().format('YYYY-MM-DD HH:mm:ss') + ") from Modash***");
      for (let handle of lists) {
        if (handle == '') {
          ret = true;
          continue;
        }
          
        //console.log("---------" + (idx + 1) + " member getting");
        ret = false;
        url = `${baseUrl}/${type}/profile/${handle}/report`;
        await apiWrapper.get(url)
        .then(response => {
          if (response.error === false) {
            report = response.profile;
          } else {
            ret = response.code;
          }
        }).catch(e=>{
          //console.log(url);
          ret = e.code;
        });
        
        if (ret !== false) {
          failed.push('[' + ret + '] ' + url);
          //console.log(url);
          //console.log(ret);
          continue;
        }

        //console.log("---------" + (idx + 1) + " member's lookalikes getting");
        let lookalikes = await apiWrapper.post(`${baseUrl}/${type}/search`, {
          sort: {},
          page: 0,
          filter: {
            influencer: {
              "relevance": ['@' + report.profile.username],
            }
          },
        }).then(response => {
          if (response.error === false) {
            return response.lookalikes;
          } else {
            ret = response.code;
          }
        }).catch(e=>{
          ret = e.code;
        });  
        if (ret !== false)
          report.lookalikes = lookalikes;

        report.lastUpdated = moment().format('YYYY-MM-DD');

        if (type === Constants.snsInstagram) {
          let hashtagengage = [];
          _.map(report.popularPosts, itm => {
            let likes = itm.likes ?? 0;
            let comments = itm.comments ?? 0;
            let followers = report.profile.followers ?? 0;

            let weight = followers > 0 ? (likes + comments) / followers * 100 : 0;
            _.map(itm.hashtags, tag => {
              let isExists = _.findIndex(hashtagengage, engage => engage.tag === tag);
              if (weight < 0.01)
                return;
              
              if (isExists === -1) {
                hashtagengage.push({tag: tag, weight: weight});
              } else {
                if (weight < hashtagengage[isExists].weight)
                  return;

                hashtagengage[isExists].weight = weight;
              }
            })
          });

          report.hashtagengage = hashtagengage;
        } else {
          let totalEngage = 0, totalPosts = 0;
          _.map(report.recentPosts, post => {
            if (!post?.views)
              return;
            
            totalPosts ++;
            totalEngage += (post.likes + post.comments) / post.views;
          });

          if (totalPosts > 0)
            report.profile.nengagementRate = totalEngage / totalPosts;
        }

        //console.log("---------" + (idx + 1) + " member writting");
        if (type === Constants.snsInstagram)
          ret = await ModashRepo.saveInstagram(report);
        else if (type === Constants.snsYoutube)
          ret = await ModashRepo.saveYoutube(report);
        else
          ret = await ModashRepo.saveTiktok(report);

        //console.log("---------" + (idx + 1) + " member writting end");
        if (ret !== true)
          break;

        downcnt ++;
      }

      console.log("***Ended(" + moment().format('YYYY-MM-DD HH:mm:ss') + ") from Modash***");
      console.log("***Get influencer lists from Modash finished***");

      //if (ret === true) {
        return res.status(200).json({
          status: 'ok',
          data: lists.length,
          failed: failed
        });  
      //}

      // return res.status(200).json({
      //   status: 'no',
      //   msg: ret,
      //   data: lists.length,
      // });  
    } catch (ex) {
      console.log(ex.toString());
      return res.status(200).json({
        status: 'no',
        msg: 'エーラが発生しました。'
      });  
    }
  }
}
