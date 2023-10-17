"use client";

import React from "react";
import { Col, Row } from "antd";

export default function Grid({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Row>
        <Col span={20} offset={2}>
          {children}
        </Col>
      </Row>
    </>
  );
}
