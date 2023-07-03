import React from 'react';
import Box from '@mui/material/Box';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';

const urls = {
  influencer: [
    '/images/key/influencer1.svg',
    '/images/key/influencer2.svg',
    '/images/key/influencer3.svg',
  ],
  target: [
    '/images/key/target1.svg',
    '/images/key/target2.svg',
    '/images/key/target3.svg',
    '/images/key/target4.svg',
  ],
};

const bgColor = { influencer: '#ddecff', target: '#e9e0ff' };

const RightSideBar = ({ type }) => {
  return (
    <Box
      sx={{
        backgroundColor: bgColor[type],
        width: '40vh',
        height: '100vh',
        position: 'fixed',
        top: '0px',
        right: '0px',
      }}
    >
      <Carousel
        sx={{ aspectRatio: '520/1082', overflow: 'visible' }}
        autoPlay={false}
        cycleNavigation={false}
        navButtonsAlwaysVisible={true}
        navButtonsWrapperProps={{
          style: {
            height: 'unset',
            top: 'unset',
            bottom: '0',
            marginLeft: '70px',
            marginRight: '70px',
          },
        }}
        navButtonsProps={{
          className: 'nav-button',
        }}
        indicatorIconButtonProps={{
          className: 'indicator-button',
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: bgColor[type],
          },
        }}
      >
        {urls[type].map((src, i) => {
          return (
            <>
              {!(type == 'influencer' && i == 1) && (
                <Image key={i} src={src} width="520px" height="1082px" />
              )}
              {type == 'influencer' && i == 1 && (
                <svg
                  id="グループ_195"
                  data-name="グループ 195"
                  width="100%"
                  viewBox="0 0 520 1081"
                >
                  <defs>
                    <linearGradient
                      id="linear-gradient"
                      x1="0.5"
                      x2="0.5"
                      y2="1"
                      gradientUnits="objectBoundingBox"
                    >
                      <stop offset="0" stop-color="#fff" />
                      <stop offset="1" stop-color="#ddecff" />
                    </linearGradient>
                    <linearGradient
                      id="linear-gradient-2"
                      x1="0.5"
                      x2="0.5"
                      y2="1"
                      gradientUnits="objectBoundingBox"
                    >
                      <stop offset="0" stop-color="#a17fef" />
                      <stop offset="1" stop-color="#fbfdff" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="linear-gradient-3"
                      x1="0.5"
                      x2="0.5"
                      y2="1"
                      gradientUnits="objectBoundingBox"
                    >
                      <stop offset="0" stop-color="#f0d8ff" />
                      <stop offset="1" stop-color="#f0d8ff" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                  <rect
                    id="長方形_510"
                    data-name="長方形 510"
                    width="520"
                    height="1081"
                    fill="#ddecff"
                  />
                  <rect
                    id="長方形_520"
                    data-name="長方形 520"
                    width="193"
                    height="70"
                    rx="9"
                    transform="translate(275 344)"
                    fill="#fff"
                  />
                  <rect
                    id="長方形_521"
                    data-name="長方形 521"
                    width="193"
                    height="70"
                    rx="9"
                    transform="translate(275 266)"
                    fill="#fff"
                  />
                  <text
                    id="ターゲット2"
                    transform="translate(353 375)"
                    fill="#a17fef"
                    font-size="11"
                    font-family="HiraKakuProN-W6, Hiragino Kaku Gothic ProN"
                    letter-spacing="0.005em"
                  >
                    <tspan x="0" y="0">
                      ターゲット2
                    </tspan>
                  </text>
                  <text
                    id="ターゲット1"
                    transform="translate(353 297)"
                    fill="#a17fef"
                    font-size="11"
                    font-family="HiraKakuProN-W6, Hiragino Kaku Gothic ProN"
                    letter-spacing="0.005em"
                  >
                    <tspan x="0" y="0">
                      ターゲット1
                    </tspan>
                  </text>
                  <text
                    id="_target_2"
                    data-name="@target_2"
                    transform="translate(353 391)"
                    fill="#a17fef"
                    font-size="9"
                    font-family="HiraKakuProN-W3, Hiragino Kaku Gothic ProN"
                    letter-spacing="0.005em"
                  >
                    <tspan x="0" y="0">
                      @target_2
                    </tspan>
                  </text>
                  <text
                    id="_target_1"
                    data-name="@target_1"
                    transform="translate(353 313)"
                    fill="#a17fef"
                    font-size="9"
                    font-family="HiraKakuProN-W3, Hiragino Kaku Gothic ProN"
                    letter-spacing="0.005em"
                  >
                    <tspan x="0" y="0">
                      @target_1
                    </tspan>
                  </text>
                  <g
                    id="グループ_107"
                    data-name="グループ 107"
                    transform="translate(815.808 -1337.144) rotate(90)"
                  >
                    <line
                      id="線_90-3"
                      data-name="線 90"
                      y2="28.778"
                      transform="translate(1876.73 575.158) rotate(-135)"
                      fill="none"
                      stroke="#1477eb"
                      stroke-linecap="round"
                      stroke-width="3"
                    />
                    <line
                      id="線_91-3"
                      data-name="線 91"
                      y2="28.778"
                      transform="translate(1876.729 534.458) rotate(-45)"
                      fill="none"
                      stroke="#1477eb"
                      stroke-linecap="round"
                      stroke-width="3"
                    />
                  </g>
                  <line
                    id="線_97"
                    data-name="線 97"
                    x1="181"
                    transform="translate(462.5 539.585) rotate(180)"
                    fill="none"
                    stroke="#1477eb"
                    stroke-linecap="round"
                    stroke-width="3"
                  />
                  <line
                    id="線_96"
                    data-name="線 96"
                    x1="181"
                    transform="translate(240.5 539.585) rotate(180)"
                    fill="none"
                    stroke="#1477eb"
                    stroke-linecap="round"
                    stroke-width="3"
                  />
                  <text
                    id="PRのターゲットとなる_ペルソナのアカウントを_選定してください"
                    data-name="PRのターゲットとなる
ペルソナのアカウントを
選定してください"
                    transform="translate(260 88)"
                    fill="#2b3949"
                    font-size="31"
                    font-family="HiraKakuProN-W6, Hiragino Kaku Gothic ProN"
                    letter-spacing="0.005em"
                  >
                    <tspan x="-163.277" y="0">
                      PRのターゲットとなる
                    </tspan>
                    <tspan x="-170.655" y="44">
                      ペルソナのアカウントを
                    </tspan>
                    <tspan x="-123.302" y="88">
                      選定してください
                    </tspan>
                  </text>
                  <text
                    id="入力して申請"
                    transform="translate(260 638)"
                    fill="#2b3949"
                    font-size="31"
                    font-family="HiraKakuProN-W6, Hiragino Kaku Gothic ProN"
                    letter-spacing="0.005em"
                  >
                    <tspan x="-92.613" y="0">
                      入力して申請
                    </tspan>
                  </text>
                  <g
                    id="Lemonade_Two_Color"
                    data-name="Lemonade_Two Color"
                    transform="translate(-51.74 262.505)"
                  >
                    <ellipse
                      id="楕円形_360"
                      data-name="楕円形 360"
                      cx="79.02"
                      cy="16.367"
                      rx="79.02"
                      ry="16.367"
                      transform="translate(95.449 177.697)"
                      opacity="0.054"
                    />
                    <path
                      id="パス_37"
                      data-name="パス 37"
                      d="M238.537,104.686V193.5a17.635,17.635,0,0,1-17.649,17.649H156.849A17.686,17.686,0,0,1,139.2,193.5V104.686A17.686,17.686,0,0,1,156.849,87h64.038A17.686,17.686,0,0,1,238.537,104.686Z"
                      transform="translate(-13.706 -17.085)"
                      fill="#fff"
                    />
                    <rect
                      id="長方形_523"
                      data-name="長方形 523"
                      width="69.654"
                      height="15.873"
                      transform="translate(140.35 54.078)"
                      fill="#fff"
                    />
                    <path
                      id="パス_38"
                      data-name="パス 38"
                      d="M262.652,192.549l-1.872-4.009,26.743-12.528a10.987,10.987,0,0,0,6.315-9.926V128.96A10.973,10.973,0,0,0,282.88,118H261.716V113.58H282.88a15.394,15.394,0,0,1,15.38,15.38v37.148a15.475,15.475,0,0,1-8.843,13.935Z"
                      transform="translate(-45.691 -24.078)"
                      fill="#fff"
                    />
                    <path
                      id="パス_39"
                      data-name="パス 39"
                      d="M148.3,135v66.478a17.811,17.811,0,0,0,17.811,17.811h48.924a17.811,17.811,0,0,0,17.789-17.841V135Z"
                      transform="translate(-16.1 -29.713)"
                      fill="#68e1fd"
                    />
                    <rect
                      id="長方形_524"
                      data-name="長方形 524"
                      width="6.958"
                      height="161.839"
                      transform="translate(140.735 23.098) rotate(-8.616)"
                      fill="#2b3949"
                    />
                    <circle
                      id="楕円形_361"
                      data-name="楕円形 361"
                      cx="18.998"
                      cy="18.998"
                      r="18.998"
                      transform="translate(176.12 120.688)"
                      fill="#ffd200"
                    />
                    <path
                      id="パス_40"
                      data-name="パス 40"
                      d="M221.43,191.7l8.733-9.492L236.227,194a13.073,13.073,0,0,1-14.8-2.277Z"
                      transform="translate(-35.339 -42.133)"
                      fill="#fff"
                      opacity="0.44"
                    />
                    <path
                      id="パス_41"
                      data-name="パス 41"
                      d="M240.407,167.684l-9.388,8.843-6.279-10.752a13.051,13.051,0,0,1,15.667,1.909Z"
                      transform="translate(-36.21 -37.342)"
                      fill="#fff"
                      opacity="0.44"
                    />
                    <path
                      id="パス_42"
                      data-name="パス 42"
                      d="M226.959,178.654a1.058,1.058,0,0,1,.052-.4h0L217.5,170.4a13.08,13.08,0,0,0-.987,15.262l10.457-6.934A.266.266,0,0,1,226.959,178.654Z"
                      transform="translate(-33.522 -39.026)"
                      fill="#fff"
                      opacity="0.44"
                    />
                    <path
                      id="パス_43"
                      data-name="パス 43"
                      d="M246.081,174.4l-11.665,5a1.058,1.058,0,0,1-.052.4,1.425,1.425,0,0,0,0,.177.442.442,0,0,1-.044.14l9.241,9.116a12.955,12.955,0,0,0,3.788-9.2,13.117,13.117,0,0,0-1.268-5.637Z"
                      transform="translate(-38.73 -40.078)"
                      fill="#fff"
                      opacity="0.44"
                    />
                    <circle
                      id="楕円形_362"
                      data-name="楕円形 362"
                      cx="21.135"
                      cy="21.135"
                      r="21.135"
                      transform="translate(134.344 95.854)"
                      fill="#ffd200"
                    />
                    <path
                      id="パス_44"
                      data-name="パス 44"
                      d="M166.27,162.02l9.713-10.56,6.75,13.1a14.525,14.525,0,0,1-16.463-2.535Z"
                      transform="translate(-20.828 -34.043)"
                      fill="#fff"
                      opacity="0.44"
                    />
                    <path
                      id="パス_45"
                      data-name="パス 45"
                      d="M187.391,135.26l-10.442,9.853L170,133.152a14.525,14.525,0,0,1,17.428,2.108Z"
                      transform="translate(-21.809 -28.706)"
                      fill="#fff"
                      opacity="0.44"
                    />
                    <path
                      id="パス_46"
                      data-name="パス 46"
                      d="M172.425,147.512a1.146,1.146,0,0,1,.059-.442h0l-10.567-8.74a14.525,14.525,0,0,0-1.1,16.949l11.629-7.708S172.418,147.534,172.425,147.512Z"
                      transform="translate(-18.81 -30.589)"
                      fill="#fff"
                      opacity="0.44"
                    />
                    <path
                      id="パス_47"
                      data-name="パス 47"
                      d="M193.693,142.78l-12.977,5.564a1.3,1.3,0,0,1-.052.442v.192a.583.583,0,0,1-.044.162l10.28,10.147a14.539,14.539,0,0,0,2.815-16.507Z"
                      transform="translate(-24.603 -31.76)"
                      fill="#fff"
                      opacity="0.44"
                    />
                    <rect
                      id="長方形_525"
                      data-name="長方形 525"
                      width="20.03"
                      height="20.03"
                      rx="4.8"
                      transform="matrix(0.927, 0.375, -0.375, 0.927, 145.517, 162.96)"
                      fill="#fff"
                      opacity="0.44"
                    />
                    <rect
                      id="長方形_526"
                      data-name="長方形 526"
                      width="20.03"
                      height="20.03"
                      rx="4.8"
                      transform="translate(153.985 145.596) rotate(-9.82)"
                      fill="#fff"
                      opacity="0.44"
                    />
                    <rect
                      id="長方形_527"
                      data-name="長方形 527"
                      width="20.03"
                      height="20.03"
                      rx="4.8"
                      transform="matrix(0.927, 0.375, -0.375, 0.927, 188.801, 91.488)"
                      fill="#fff"
                      opacity="0.44"
                    />
                    <rect
                      id="長方形_528"
                      data-name="長方形 528"
                      width="20.03"
                      height="20.03"
                      rx="4.8"
                      transform="matrix(0.95, -0.311, 0.311, 0.95, 181.704, 169.587)"
                      fill="#fff"
                      opacity="0.44"
                    />
                    <path
                      id="パス_48"
                      data-name="パス 48"
                      d="M253.561,232.071A17.686,17.686,0,0,1,236.553,245H206.288a16.522,16.522,0,0,1-3.581-6.684c-2.307-.383-4.016-1.835-4.016-3.559s1.71-3.169,4.016-3.559c2.255-8.843,12.734-15.534,25.328-15.534C241.041,215.66,251.8,222.793,253.561,232.071Z"
                      transform="translate(-29.357 -50.933)"
                      opacity="0.09"
                    />
                    <path
                      id="パス_49"
                      data-name="パス 49"
                      d="M279.1,245.861s8.725-.332,10.317-3.685,1.194-9.757,1.194-9.757l-3.4.324s.8,6.05-1.378,8.379-8.983,1.968-8.983,1.968l2.248,3.265"
                      transform="translate(-49.919 -55.342)"
                      fill="#24285b"
                    />
                    <path
                      id="パス_50"
                      data-name="パス 50"
                      d="M237.944,222c-12.594,0-23.073,6.691-25.321,15.534-2.314.391-4.024,1.835-4.024,3.567s1.71,3.169,4.024,3.559c2.248,8.843,12.727,15.534,25.321,15.534,14.237,0,25.792-8.548,25.792-19.094S252.182,222,237.944,222Z"
                      transform="translate(-31.964 -52.601)"
                      fill="#ffd200"
                    />
                    <path
                      id="パス_51"
                      data-name="パス 51"
                      d="M292.86,245.106a9.594,9.594,0,0,1,12.307,2.778S300.1,255.076,292.86,245.106Z"
                      transform="translate(-54.131 -58.374)"
                      fill="#24285b"
                    />
                    <path
                      id="パス_52"
                      data-name="パス 52"
                      d="M224.2,234.719c-.906.98-1.8,2.307-1.319,3.559a3.147,3.147,0,0,0,1.253,1.4,9.941,9.941,0,0,0,6.934,1.474,15.851,15.851,0,0,0,6.632-2.734c3.751-2.542,5.9-9.5-.184-10.752C232.963,226.7,227.009,231.7,224.2,234.719Z"
                      transform="translate(-35.686 -54.06)"
                      fill="#fff"
                      opacity="0.44"
                    />
                  </g>
                  <g
                    id="長方形_529"
                    data-name="長方形 529"
                    transform="translate(60 712)"
                    fill="#fff"
                    stroke="#1477eb"
                    stroke-width="1.5"
                  >
                    <rect width="403" height="144" rx="8" stroke="none" />
                    <rect
                      x="0.75"
                      y="0.75"
                      width="401.5"
                      height="142.5"
                      rx="7.25"
                      fill="none"
                    />
                  </g>
                  <text
                    id="ユーザーネーム"
                    transform="translate(60 700)"
                    fill="#2b3949"
                    font-size="16"
                    font-family="HiraKakuProN-W6, Hiragino Kaku Gothic ProN"
                    letter-spacing="0.005em"
                  >
                    <tspan x="0" y="0">
                      ユーザーネーム
                    </tspan>
                  </text>
                  <rect
                    id="長方形_530"
                    data-name="長方形 530"
                    width="193"
                    height="70"
                    rx="9"
                    transform="translate(275 422)"
                    fill="url(#linear-gradient)"
                  />
                  <text
                    id="ターゲット3"
                    transform="translate(353 452)"
                    fill="#a17fef"
                    font-size="11"
                    font-family="HiraKakuProN-W6, Hiragino Kaku Gothic ProN"
                    letter-spacing="0.005em"
                  >
                    <tspan x="0" y="0">
                      ターゲット3
                    </tspan>
                  </text>
                  <text
                    id="_target_3"
                    data-name="@target_3"
                    transform="translate(353 469)"
                    fill="#a17fef"
                    font-size="9"
                    font-family="HiraKakuProN-W3, Hiragino Kaku Gothic ProN"
                    letter-spacing="0.005em"
                  >
                    <tspan x="0" y="0">
                      @target_3
                    </tspan>
                  </text>
                  <g
                    id="グループ_112"
                    data-name="グループ 112"
                    transform="translate(-5745 -3760)"
                  >
                    <line
                      id="線_98"
                      data-name="線 98"
                      x2="30"
                      transform="translate(5967.5 4139)"
                      fill="none"
                      stroke="#1477eb"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_99"
                      data-name="線 99"
                      x2="9"
                      transform="translate(5991.5 4132.636) rotate(45)"
                      fill="none"
                      stroke="#1477eb"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_100"
                      data-name="線 100"
                      x2="9"
                      transform="translate(5997.864 4139) rotate(135)"
                      fill="none"
                      stroke="#1477eb"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="グループ_110"
                    data-name="グループ 110"
                    transform="translate(-5745 -3760)"
                  >
                    <line
                      id="線_101"
                      data-name="線 101"
                      y1="16.545"
                      x2="27.833"
                      transform="translate(5967.5 4070.955)"
                      fill="none"
                      stroke="#1477eb"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_102"
                      data-name="線 102"
                      x2="9"
                      transform="matrix(0.966, 0.259, -0.259, 0.966, 5986.955, 4068.444)"
                      fill="none"
                      stroke="#1477eb"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_103"
                      data-name="線 103"
                      x2="9"
                      transform="matrix(-0.259, 0.966, -0.966, -0.259, 5995.648, 4070.773)"
                      fill="none"
                      stroke="#1477eb"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="グループ_111"
                    data-name="グループ 111"
                    transform="translate(222.5 430.5)"
                  >
                    <line
                      id="線_101-2"
                      data-name="線 101"
                      x2="27.833"
                      y2="16.545"
                      transform="translate(0 0)"
                      fill="none"
                      stroke="#1477eb"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_102-2"
                      data-name="線 102"
                      x2="9"
                      transform="matrix(0.966, -0.259, 0.259, 0.966, 19.455, 19.057)"
                      fill="none"
                      stroke="#1477eb"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_103-2"
                      data-name="線 103"
                      x2="9"
                      transform="matrix(-0.259, -0.966, 0.966, -0.259, 28.148, 16.727)"
                      fill="none"
                      stroke="#1477eb"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="グループ_113"
                    data-name="グループ 113"
                    transform="translate(70.537 723.932)"
                  >
                    <rect
                      id="長方形_531"
                      data-name="長方形 531"
                      width="120"
                      height="34"
                      rx="5"
                      transform="translate(0.463 0.068)"
                      fill="#a17fef"
                      opacity="0.302"
                    />
                    <text
                      id="_target_1-2"
                      data-name="@target_1"
                      transform="translate(9.463 21.068)"
                      fill="#2b3949"
                      font-size="13"
                      font-family="HiraKakuProN-W3, Hiragino Kaku Gothic ProN"
                      letter-spacing="0.005em"
                    >
                      <tspan x="0" y="0">
                        @target_1
                      </tspan>
                    </text>
                    <line
                      id="線_104"
                      data-name="線 104"
                      y2="10.652"
                      transform="translate(108.574 13.025) rotate(45)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_105"
                      data-name="線 105"
                      y2="10.652"
                      transform="translate(108.574 20.557) rotate(135)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="グループ_115"
                    data-name="グループ 115"
                    transform="translate(70.537 767.132)"
                  >
                    <rect
                      id="長方形_531-2"
                      data-name="長方形 531"
                      width="120"
                      height="34"
                      rx="5"
                      transform="translate(0.463 -0.132)"
                      fill="#a17fef"
                      opacity="0.302"
                    />
                    <text
                      id="_target_4"
                      data-name="@target_4"
                      transform="translate(9.463 20.868)"
                      fill="#2b3949"
                      font-size="13"
                      font-family="HiraKakuProN-W3, Hiragino Kaku Gothic ProN"
                      letter-spacing="0.005em"
                    >
                      <tspan x="0" y="0">
                        @target_4
                      </tspan>
                    </text>
                    <line
                      id="線_104-2"
                      data-name="線 104"
                      y2="10.652"
                      transform="translate(108.574 13.095) rotate(45)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_105-2"
                      data-name="線 105"
                      y2="10.652"
                      transform="translate(108.574 20.627) rotate(135)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="グループ_117"
                    data-name="グループ 117"
                    transform="translate(70.537 810.333)"
                  >
                    <rect
                      id="長方形_531-3"
                      data-name="長方形 531"
                      width="120"
                      height="34"
                      rx="5"
                      transform="translate(0.463 -0.333)"
                      fill="#a17fef"
                      opacity="0.302"
                    />
                    <text
                      id="_target_7"
                      data-name="@target_7"
                      transform="translate(9.463 20.667)"
                      fill="#2b3949"
                      font-size="13"
                      font-family="HiraKakuProN-W3, Hiragino Kaku Gothic ProN"
                      letter-spacing="0.005em"
                    >
                      <tspan x="0" y="0">
                        @target_7
                      </tspan>
                    </text>
                    <line
                      id="線_104-3"
                      data-name="線 104"
                      y2="10.652"
                      transform="translate(108.574 13.164) rotate(45)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_105-3"
                      data-name="線 105"
                      y2="10.652"
                      transform="translate(108.574 20.696) rotate(135)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="グループ_114"
                    data-name="グループ 114"
                    transform="translate(201.191 723.932)"
                  >
                    <rect
                      id="長方形_531-4"
                      data-name="長方形 531"
                      width="120"
                      height="34"
                      rx="5"
                      transform="translate(-0.191 0.068)"
                      fill="#a17fef"
                      opacity="0.302"
                    />
                    <text
                      id="_target_2-2"
                      data-name="@target_2"
                      transform="translate(9.809 21.068)"
                      fill="#2b3949"
                      font-size="13"
                      font-family="HiraKakuProN-W3, Hiragino Kaku Gothic ProN"
                      letter-spacing="0.005em"
                    >
                      <tspan x="0" y="0">
                        @target_2
                      </tspan>
                    </text>
                    <line
                      id="線_104-4"
                      data-name="線 104"
                      y2="10.652"
                      transform="translate(108.576 13.025) rotate(45)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_105-4"
                      data-name="線 105"
                      y2="10.652"
                      transform="translate(108.576 20.557) rotate(135)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="グループ_119"
                    data-name="グループ 119"
                    transform="translate(331.846 723.932)"
                  >
                    <rect
                      id="長方形_531-5"
                      data-name="長方形 531"
                      width="120"
                      height="34"
                      rx="5"
                      transform="translate(0.154 0.068)"
                      fill="#a17fef"
                      opacity="0.302"
                    />
                    <text
                      id="_target_3-2"
                      data-name="@target_3"
                      transform="translate(9.154 21.068)"
                      fill="#2b3949"
                      font-size="13"
                      font-family="HiraKakuProN-W3, Hiragino Kaku Gothic ProN"
                      letter-spacing="0.005em"
                    >
                      <tspan x="0" y="0">
                        @target_3
                      </tspan>
                    </text>
                    <line
                      id="線_104-5"
                      data-name="線 104"
                      y2="10.652"
                      transform="translate(108.576 13.025) rotate(45)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_105-5"
                      data-name="線 105"
                      y2="10.652"
                      transform="translate(108.576 20.557) rotate(135)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="グループ_116"
                    data-name="グループ 116"
                    transform="translate(201.191 767.132)"
                  >
                    <rect
                      id="長方形_531-6"
                      data-name="長方形 531"
                      width="120"
                      height="34"
                      rx="5"
                      transform="translate(-0.191 -0.132)"
                      fill="#a17fef"
                      opacity="0.302"
                    />
                    <text
                      id="_target_5"
                      data-name="@target_5"
                      transform="translate(9.809 20.868)"
                      fill="#2b3949"
                      font-size="13"
                      font-family="HiraKakuProN-W3, Hiragino Kaku Gothic ProN"
                      letter-spacing="0.005em"
                    >
                      <tspan x="0" y="0">
                        @target_5
                      </tspan>
                    </text>
                    <line
                      id="線_104-6"
                      data-name="線 104"
                      y2="10.652"
                      transform="translate(108.576 13.095) rotate(45)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_105-6"
                      data-name="線 105"
                      y2="10.652"
                      transform="translate(108.576 20.627) rotate(135)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="グループ_120"
                    data-name="グループ 120"
                    transform="translate(332.191 767.132)"
                  >
                    <rect
                      id="長方形_531-7"
                      data-name="長方形 531"
                      width="120"
                      height="34"
                      rx="5"
                      transform="translate(-0.191 -0.132)"
                      fill="#a17fef"
                      opacity="0.302"
                    />
                    <text
                      id="_target_6"
                      data-name="@target_6"
                      transform="translate(9.809 21.868)"
                      fill="#2b3949"
                      font-size="13"
                      font-family="HiraKakuProN-W3, Hiragino Kaku Gothic ProN"
                      letter-spacing="0.005em"
                    >
                      <tspan x="0" y="0">
                        @target_6
                      </tspan>
                    </text>
                    <line
                      id="線_104-7"
                      data-name="線 104"
                      y2="10.652"
                      transform="translate(108.576 13.095) rotate(45)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_105-7"
                      data-name="線 105"
                      y2="10.652"
                      transform="translate(108.576 20.627) rotate(135)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="グループ_118"
                    data-name="グループ 118"
                    transform="translate(201.191 810.333)"
                  >
                    <rect
                      id="長方形_531-8"
                      data-name="長方形 531"
                      width="120"
                      height="34"
                      rx="5"
                      transform="translate(-0.191 -0.333)"
                      fill="#a17fef"
                      opacity="0.302"
                    />
                    <text
                      id="_target_8"
                      data-name="@target_8"
                      transform="translate(9.809 20.667)"
                      fill="#2b3949"
                      font-size="13"
                      font-family="HiraKakuProN-W3, Hiragino Kaku Gothic ProN"
                      letter-spacing="0.005em"
                    >
                      <tspan x="0" y="0">
                        @target_8
                      </tspan>
                    </text>
                    <line
                      id="線_104-8"
                      data-name="線 104"
                      y2="10.652"
                      transform="translate(108.576 13.164) rotate(45)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_105-8"
                      data-name="線 105"
                      y2="10.652"
                      transform="translate(108.576 20.696) rotate(135)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="グループ_121"
                    data-name="グループ 121"
                    transform="translate(332.191 810.333)"
                  >
                    <rect
                      id="長方形_531-9"
                      data-name="長方形 531"
                      width="120"
                      height="34"
                      rx="5"
                      transform="translate(-0.191 -0.333)"
                      fill="#a17fef"
                      opacity="0.302"
                    />
                    <text
                      id="_target_9"
                      data-name="@target_9"
                      transform="translate(9.809 20.667)"
                      fill="#2b3949"
                      font-size="13"
                      font-family="HiraKakuProN-W3, Hiragino Kaku Gothic ProN"
                      letter-spacing="0.005em"
                    >
                      <tspan x="0" y="0">
                        @target_9
                      </tspan>
                    </text>
                    <line
                      id="線_104-9"
                      data-name="線 104"
                      y2="10.652"
                      transform="translate(108.576 13.164) rotate(45)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                    <line
                      id="線_105-9"
                      data-name="線 105"
                      y2="10.652"
                      transform="translate(108.576 20.696) rotate(135)"
                      fill="none"
                      stroke="#2b3949"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="長方形_532"
                    data-name="長方形 532"
                    transform="translate(172 888)"
                    fill="#1477eb"
                    stroke="#1477eb"
                    stroke-width="1.5"
                  >
                    <rect width="180" height="51" stroke="none" />
                    <rect
                      x="0.75"
                      y="0.75"
                      width="178.5"
                      height="49.5"
                      fill="none"
                    />
                  </g>
                  <text
                    id="申請"
                    transform="translate(262 920)"
                    fill="#fff"
                    font-size="18"
                    font-family="HiraKakuProN-W6, Hiragino Kaku Gothic ProN"
                    letter-spacing="0.005em"
                  >
                    <tspan x="-18.045" y="0">
                      申請
                    </tspan>
                  </text>
                  <path
                    id="パス_53"
                    data-name="パス 53"
                    d="M249.592,160.82s-5.7,1.967-2.794,9.075,8.369,20.58,8.369,20.58l-5.632.656s-2.559,5.346,3.992,6.986,10.557,8.184,10.557,8.184h12.375l-2.36-13.1s-14.015-18.042-14.927-18.941S249.592,160.82,249.592,160.82Z"
                    transform="translate(47.279 751.992)"
                    opacity="0.08"
                  />
                  <path
                    id="パス_54"
                    data-name="パス 54"
                    d="M260.982,185.336s-12.625-23.774-9.709-27.965,15.291,19.589,15.291,19.589,11.527-5.7,15.041-1.7,3.885,19.169,3.885,19.169l-13.145,4.99s-8.7-6.33-15.975-6.694C250.41,192.436,244.778,185.093,260.982,185.336Z"
                    transform="translate(46.019 753.125)"
                    fill="#ffc9ba"
                  />
                  <path
                    id="パス_55"
                    data-name="パス 55"
                    d="M281.2,214.557l11.57,34.559,18.563-9.944L294.345,209.56Z"
                    transform="translate(37.164 737.997)"
                    fill="#a0ccff"
                  />
                  <text
                    id="ペルソナは_セグメント_の切り方が重要になります_こちらをヒントに選定しましょう"
                    data-name="ペルソナは「セグメント」の切り方が重要になります。
こちらをヒントに選定しましょう"
                    transform="translate(260 215)"
                    fill="#2b3949"
                    font-size="14"
                    font-family="HiraKakuProN-W6, Hiragino Kaku Gothic ProN"
                    letter-spacing="0.005em"
                  >
                    <tspan x="-174.3" y="0">
                      ペルソナは「セグメント」の切り方が重要になります。
                    </tspan>
                    <tspan fill="#f22f54">
                      <a
                        target="_blank"
                        href="https://astream-sg-jp.firebaseapp.com/キーアカウント調査.pdf"
                      >
                        <tspan x="-105.49" y="24" text-decoration="underline">
                          こちら
                        </tspan>
                      </a>
                      <tspan y="24" fill="#2b3949">
                        をヒントに選定しましょう
                      </tspan>
                    </tspan>
                  </text>
                  <g
                    id="User_Profile_Two_Color"
                    data-name="User Profile_Two Color"
                    transform="translate(73.169 234.701)"
                  >
                    <circle
                      id="楕円形_380"
                      data-name="楕円形 380"
                      cx="28.751"
                      cy="28.751"
                      r="28.751"
                      transform="translate(213.08 37.2)"
                      fill="none"
                      opacity="0.45"
                    />
                    <path
                      id="パス_70"
                      data-name="パス 70"
                      d="M280.559,70.549a25.531,25.531,0,0,1,.471,6.8,2.059,2.059,0,0,1-2.322,1.771,4.552,4.552,0,0,1-3.939-2.984l-1.642-3.414a3.68,3.68,0,0,1,1.15-4.1C276.383,66.7,280.176,68.073,280.559,70.549Z"
                      transform="translate(-34.894 -17.798)"
                      fill="#f4a28c"
                    />
                    <path
                      id="パス_71"
                      data-name="パス 71"
                      d="M273.394,81.21l-.534,13.442,7.427-.238-2.592-9.682Z"
                      transform="translate(-34.864 -25.667)"
                      fill="#f4a28c"
                    />
                    <path
                      id="パス_72"
                      data-name="パス 72"
                      d="M278.945,82.244s-.217-1.563-1.38-1.3-.867,2.526.763,2.547Z"
                      transform="translate(-37.198 -25.492)"
                      fill="#f4a28c"
                    />
                    <path
                      id="パス_73"
                      data-name="パス 73"
                      d="M291.5,80.65l1.321,1.434a.659.659,0,0,1-.288,1.075L291,83.634Z"
                      transform="translate(-45.443 -25.34)"
                      fill="#f4a28c"
                    />
                    <path
                      id="パス_74"
                      data-name="パス 74"
                      d="M282.448,93.117A4.847,4.847,0,0,1,279.91,92a7.715,7.715,0,0,0,3.364,4.526Z"
                      transform="translate(-38.975 -31.959)"
                      fill="#ce8172"
                      opacity="0.31"
                    />
                    <path
                      id="パス_75"
                      data-name="パス 75"
                      d="M235.912,131.441s-.77-18.941,18.694-19.874S273.1,132.181,273.1,132.181,255.736,147.223,235.912,131.441Z"
                      transform="translate(-13.121 -43.353)"
                      fill="#f0d8ff"
                    />
                    <path
                      id="パス_80"
                      data-name="パス 80"
                      d="M275.529,69.682l6.048-.533s-.746-4.364-5-5.11-6.706,1.6-7.023,6.069,1.667,6.373,1.667,6.373S276.721,76.6,275.529,69.682Z"
                      transform="translate(-32.915 -15.572)"
                      fill="#24285b"
                    />
                    <path
                      id="パス_81"
                      data-name="パス 81"
                      d="M264.089,65.659s-5.156,1.025-5.156,8.807-6.1,11.545-1.063,16.226,13.125,1.634,9.72-4.681,1.959-8.586,0-15.422S264.089,65.659,264.089,65.659Z"
                      transform="translate(-24.959 -16.455)"
                      fill="#24285b"
                    />
                  </g>
                  <g
                    id="User_Profile_Two_Color-2"
                    data-name="User Profile_Two Color"
                    transform="translate(73.169 312.701)"
                  >
                    <circle
                      id="楕円形_380-2"
                      data-name="楕円形 380"
                      cx="28.751"
                      cy="28.751"
                      r="28.751"
                      transform="translate(213.08 37.2)"
                      fill="none"
                      opacity="0.45"
                    />
                    <path
                      id="パス_70-2"
                      data-name="パス 70"
                      d="M280.559,70.549a25.531,25.531,0,0,1,.471,6.8,2.059,2.059,0,0,1-2.322,1.771,4.552,4.552,0,0,1-3.939-2.984l-1.642-3.414a3.68,3.68,0,0,1,1.15-4.1C276.383,66.7,280.176,68.073,280.559,70.549Z"
                      transform="translate(-34.894 -17.798)"
                      fill="#f4a28c"
                    />
                    <path
                      id="パス_71-2"
                      data-name="パス 71"
                      d="M273.394,81.21l-.534,13.442,7.427-.238-2.592-9.682Z"
                      transform="translate(-34.864 -25.667)"
                      fill="#f4a28c"
                    />
                    <path
                      id="パス_72-2"
                      data-name="パス 72"
                      d="M278.945,82.244s-.217-1.563-1.38-1.3-.867,2.526.763,2.547Z"
                      transform="translate(-37.198 -25.492)"
                      fill="#f4a28c"
                    />
                    <path
                      id="パス_73-2"
                      data-name="パス 73"
                      d="M291.5,80.65l1.321,1.434a.659.659,0,0,1-.288,1.075L291,83.634Z"
                      transform="translate(-45.443 -25.34)"
                      fill="#f4a28c"
                    />
                    <path
                      id="パス_74-2"
                      data-name="パス 74"
                      d="M282.448,93.117A4.847,4.847,0,0,1,279.91,92a7.715,7.715,0,0,0,3.364,4.526Z"
                      transform="translate(-38.975 -31.959)"
                      fill="#ce8172"
                      opacity="0.31"
                    />
                    <path
                      id="パス_75-2"
                      data-name="パス 75"
                      d="M235.912,131.441s-.77-18.941,18.694-19.874S273.1,132.181,273.1,132.181,255.736,147.223,235.912,131.441Z"
                      transform="translate(-13.121 -43.353)"
                      fill="#f0d8ff"
                    />
                    <path
                      id="パス_80-2"
                      data-name="パス 80"
                      d="M275.529,69.682l6.048-.533s-.746-4.364-5-5.11-6.706,1.6-7.023,6.069,1.667,6.373,1.667,6.373S276.721,76.6,275.529,69.682Z"
                      transform="translate(-32.915 -15.572)"
                      fill="#24285b"
                    />
                    <path
                      id="パス_81-2"
                      data-name="パス 81"
                      d="M264.089,65.659s-5.156,1.025-5.156,8.807-6.1,11.545-1.063,16.226,13.125,1.634,9.72-4.681,1.959-8.586,0-15.422S264.089,65.659,264.089,65.659Z"
                      transform="translate(-24.959 -16.455)"
                      fill="#24285b"
                    />
                  </g>
                  <circle
                    id="楕円形_382"
                    data-name="楕円形 382"
                    cx="29"
                    cy="29"
                    r="29"
                    transform="translate(286 428)"
                    fill="url(#linear-gradient-2)"
                  />
                  <g
                    id="User_Profile_Two_Color-3"
                    data-name="User Profile_Two Color"
                    transform="translate(73.169 390.8)"
                  >
                    <circle
                      id="楕円形_380-3"
                      data-name="楕円形 380"
                      cx="28.751"
                      cy="28.751"
                      r="28.751"
                      transform="translate(213.08 37.2)"
                      fill="none"
                      opacity="0.45"
                    />
                    <path
                      id="パス_70-3"
                      data-name="パス 70"
                      d="M280.559,70.549a25.531,25.531,0,0,1,.471,6.8,2.059,2.059,0,0,1-2.322,1.771,4.552,4.552,0,0,1-3.939-2.984l-1.642-3.414a3.68,3.68,0,0,1,1.15-4.1C276.383,66.7,280.176,68.073,280.559,70.549Z"
                      transform="translate(-34.894 -17.798)"
                      fill="#f4a28c"
                    />
                    <path
                      id="パス_71-3"
                      data-name="パス 71"
                      d="M273.394,81.21l-.534,13.442,7.427-.238-2.592-9.682Z"
                      transform="translate(-34.864 -25.667)"
                      fill="#f4a28c"
                    />
                    <path
                      id="パス_72-3"
                      data-name="パス 72"
                      d="M278.945,82.244s-.217-1.563-1.38-1.3-.867,2.526.763,2.547Z"
                      transform="translate(-37.198 -25.492)"
                      fill="#f4a28c"
                    />
                    <path
                      id="パス_73-3"
                      data-name="パス 73"
                      d="M291.5,80.65l1.321,1.434a.659.659,0,0,1-.288,1.075L291,83.634Z"
                      transform="translate(-45.443 -25.34)"
                      fill="#f4a28c"
                    />
                    <path
                      id="パス_74-3"
                      data-name="パス 74"
                      d="M282.448,93.117A4.847,4.847,0,0,1,279.91,92a7.715,7.715,0,0,0,3.364,4.526Z"
                      transform="translate(-38.975 -31.959)"
                      fill="#ce8172"
                      opacity="0.31"
                    />
                    <path
                      id="パス_75-3"
                      data-name="パス 75"
                      d="M235.912,131.441s-.77-18.941,18.694-19.874S273.1,132.181,273.1,132.181,255.736,147.223,235.912,131.441Z"
                      transform="translate(-13.121 -43.353)"
                      fill="url(#linear-gradient-3)"
                    />
                    <path
                      id="パス_80-3"
                      data-name="パス 80"
                      d="M275.529,69.682l6.048-.533s-.746-4.364-5-5.11-6.706,1.6-7.023,6.069,1.667,6.373,1.667,6.373S276.721,76.6,275.529,69.682Z"
                      transform="translate(-32.915 -15.572)"
                      fill="#24285b"
                    />
                    <path
                      id="パス_81-3"
                      data-name="パス 81"
                      d="M264.089,65.659s-5.156,1.025-5.156,8.807-6.1,11.545-1.063,16.226,13.125,1.634,9.72-4.681,1.959-8.586,0-15.422S264.089,65.659,264.089,65.659Z"
                      transform="translate(-24.959 -16.455)"
                      fill="#24285b"
                    />
                  </g>
                </svg>
              )}
            </>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default RightSideBar;
