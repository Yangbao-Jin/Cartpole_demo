import React, { useState } from 'react';
import { Button, Progress, Upload, message, Spin, Space, Card, Input, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [trainProgress, setTrainProgress] = useState(0);
  const [trainLog, setTrainLog] = useState([]);
  const [testAnimation, setTestAnimation] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [githubUrl, setGithubUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Simulate training progress
  const simulateTraining = () => {
    setIsTraining(true);
    let progress = 0;
    let epoch = 0;  
    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
        message.success('Training complete');
        setIsTraining(false);
      } else {
        progress += 10;
        epoch += 1;
        setTrainProgress(progress);
        setTrainLog((prevLog) => [
          ...prevLog,
          `Epoch ${epoch}: Loss = ${Math.random().toFixed(4)}`,
        ]);
      }
    }, 1000);
  };

  // Simulate testing process
  const simulateTesting = () => {
    setIsTesting(true);
    let frames = 0;

    const interval = setInterval(() => {
      if (frames >= 50) {
        clearInterval(interval);
        setIsTesting(false);
        message.success('Testing complete, animation generated');
        setVideoUrl('/cartpole.mp4');
      } else {
        frames += 1;
        setTestAnimation(`Frame ${frames}`); // Simulate animation frame
      }
    }, 100);
  };

  // Handle folder upload simulation
  const handleUploadSimulation = () => {
    if (isUploading) {
      message.warning('An upload task is already in progress, please try again later');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    let progress = 0;

    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
        message.success('Folder upload simulation complete');
        setUploadProgress(0);
        setIsUploading(false);
      } else {
        progress += 10;
        setUploadProgress(progress);
      }
    }, 500);
  };

  // Handle GitHub clone logic
  const handleGithubClone = () => {
    if (githubUrl) {
      message.success(`Successfully cloned project from ${githubUrl}`);
    } else {
      message.error('Please enter a valid GitHub project URL');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <Card title="Frontend Demo Platform" style={{ maxWidth: 800, margin: 'auto' }}>
        <h2>Upload Project Folder</h2>
        <Button icon={<UploadOutlined />} disabled={isUploading} onClick={handleUploadSimulation}>
          Simulate Folder Upload
        </Button>
        
        {/* Show upload progress bar */}
        {isUploading && (
          <div style={{ marginTop: '20px' }}>
            <Progress percent={uploadProgress} status="active" />
          </div>
        )}

        <h2 style={{ marginTop: '20px' }}>Or Clone Project from GitHub</h2>
        <Input
          placeholder="Enter GitHub Project URL"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />
        <Button
          type="primary"
          onClick={handleGithubClone}
          style={{ marginTop: '10px' }}
        >
          Clone GitHub Project
        </Button>

        <Space style={{ marginTop: '20px' ,marginLeft:'10px'}}>
          <Button
            type="primary"
            onClick={simulateTraining}
            loading={isTraining}
            disabled={isTraining || isTesting}
          >
            Start Training
          </Button>

          <Button
            type="primary"
            onClick={simulateTesting}
            loading={isTesting}
            disabled={isTesting || isTraining}
          >
            Start Testing
          </Button>
        </Space>

        {/* Show training progress bar */}
        <div style={{ marginTop: '20px' }}>
          {isTraining && <Progress percent={trainProgress} status="active" />}
        </div>

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={12}>
            {/* Show training log */}
            {trainLog.length > 0 && (
              <Card title="Training Log">
                {trainLog.map((log, index) => (
                  <p key={index}>{log}</p>
                ))}
              </Card>
            )}
          </Col>
          <Col span={12}>
            {/* Show testing animation */}
            {isTesting && (
              <>
                <h3>Running Test Animation:</h3>
                <Spin size="large" />
                <div style={{ marginTop: '20px' }}>
                  <p>{testAnimation}</p>
                </div>
              </>
            )}

            {/* Play test video */}
            {videoUrl && (
              <div style={{ marginTop: '20px' }}>
                <h3>Play Test Video:</h3>
                <video width="100%" controls>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default App;
