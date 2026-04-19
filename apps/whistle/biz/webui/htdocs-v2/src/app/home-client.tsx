"use client";

import { Button, Card, Typography } from "antd";
import styles from "./page.module.css";

export default function HomeClient() {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Card title="Whistle WebUI V2" style={{ width: 420 }}>
          <Typography.Paragraph>
            This page is rendered in CSR mode only.
          </Typography.Paragraph>
          <Button type="primary" onClick={handleClick}>
            Hello Ant Design
          </Button>
          yes or no?
          <div>
            hello world1
          </div>
          <div> 
            hello world 2
          </div>
          <div>
            hello world 3
          </div>
          <div>
            hello world 4
          </div>
          <div>
            hello world 5
          </div>
          <div>
            hello world 6
          </div>
        </Card>
      </main>
    </div>
  );
}
