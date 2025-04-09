import React from "react";
import CompanyPage from "../potato/components/companyPage";
import {Head} from "next/document";
import Layout from "../layouts/Layout";
export default function Company1() {
  return (
    <Layout title={"회사 소개 | waveware"}>
      <CompanyPage />
    </Layout>
  );
}
