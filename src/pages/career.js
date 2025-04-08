import React, { useState, useEffect } from "react";
import MenuHeader from "../kwon/components/menuheader";
import ProcessComponent from "../kwon/career/process_component";
import Requirements from "../kwon/career/Requirements";
import SectionTitle from "../kwon/components/section_title";
import RecruitmentProcess from "../kwon/career/recruitment_process";
import WhoWeWant from "../kwon/career/who_we_want";
import Apply from "../kwon/career/Apply";

export default function Career() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <MenuHeader title={"Career"} description={"사람의 성장이 회사의 성장이라고 믿습니다."} />

      <SectionTitle text={"Recruitment Process"} />

      <RecruitmentProcess />

      <SectionTitle text={"Who We Want"} />

      <WhoWeWant />

      <Apply />
    </main>
  );
}
