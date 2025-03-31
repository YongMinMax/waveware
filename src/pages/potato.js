import React, { useState, useRef, useEffect } from "react";
import SkillPage from "../potato/components/skillPage";
import CompanyLongScrollPage from "../potato/components/companyLongScrollPage";

const PotatoPage = () => {
  return (
    <>
      <CompanyLongScrollPage />
      <SkillPage />
    </>
  );
};

export default PotatoPage;
