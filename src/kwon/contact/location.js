export default function Location() {
  return (
    <div className="md:w-[1400px] mx-auto my-[50px]">

      <section className="flex flex-col md:flex-row justify-between items-start mx-6 md:mx-0 md:h-[500px]">

        {/* 회사 정보 섹션 */}
        <div className="flex flex-col gap-6 md:w-[40%] md:h-full">

          <span className="w-full pb-4 text-5xl font-bold text-left">Location</span>

          <dl className="addr_item">
            <dt>Address</dt>
            <dd>대전광역시 유성구 테크노4로 17 대덕비즈센터 D동 104호</dd>
            <dd>D-104, Daedeok Biz Center, 17 Techno 4-ro, Daejeon</dd>
          </dl>
          <dl className="addr_item">
            <dt>Tel</dt>
            <dd>042-864-4842</dd>
          </dl>
          <dl className="addr_item">
            <dt>Fax</dt>
            <dd>042-864-4841</dd>
          </dl>
          <dl className="addr_item">
            <dt>E-Mail</dt>
            <dd>osy3165@waveware.co.kr</dd>
          </dl>

          <div className={"h-full w-full flex items-end justify-start gap-8 mt-6"}>
            <a href="https://kko.kakao.com/QDsN7foYqn">
              <img src="/icon/kakaomap_basic.png" className={"w-10 h-10"}/>
            </a>
            <a href="https://naver.me/GhE87F3K">
              <img src="/icon/naver_map.png" className={"w-10 h-10"}/>
            </a>
            <a href="https://maps.app.goo.gl/SfX8buixnQhQcsty8">
              <img src="/icon/Google_Maps.svg" className={"w-10 h-10"}/>
            </a>
          </div>

        </div>

        {/* 지도 */}
        <div
          className="hidden md:block rounded-lg overflow-hidden w-[55%] h-full"
          style={{
            backgroundImage: `url('/img/map.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/*<KakaoMap/>*/}
        </div>
      </section>

    </div>
  );
}