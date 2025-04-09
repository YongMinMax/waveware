import MenuHeader from "../kwon/components/menuheader";
import TimeLine from "../kwon/history/timeline";
import Layout from "../layouts/Layout";

export default function History() {
  return (
      <Layout title={"연혁 | waveware"}>
          <MenuHeader
            title={"History"}
            description={
              "기술로 써 내려온 성장의 기록/ 미래를 향한 우리의 발자취입니다."
            }
          />
          <TimeLine />
      </Layout>
  );
}
