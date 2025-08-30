// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Elastic Beanstalk Node.js App</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        header { background: #232f3e; color: white; padding: 20px; border-radius: 5px; }
        h1 { margin: 0; }
        .content { padding: 20px; border: 1px solid #ddd; border-radius: 5px; margin-top: 20px; }
        .status { color: #008800; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>AWS Elastic Beanstalk</h1>
          <p>Node.js Application Deployment with CI/CD using node.js trigger iam user</p>
        </header>
        
        <div class="content">
          <h2>Welcome to the Elastic Beanstalk Lab</h2>
          <p>This Node.js application has been successfully deployed using AWS Elastic Beanstalk.</p>
          
          <h3>Deployment Details:</h3>
          <ul>
            <li>Runtime: Node.js</li>
            <li>Platform: AWS Elastic Beanstalk</li>
            <li>Code Hosting: GitHub</li>
            <li>Artifact Storage: Amazon S3</li>
          </ul>
          
          <p class="status">Application status: <span>✅ Running successfully</span></p>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});