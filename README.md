# Elastic Beanstalk Express.js Application

A simple Node.js web application deployed on AWS Elastic Beanstalk demonstrating basic Express.js functionality with manual S3 deployment.

## 🌐 Live Application
**URL:** http://elastic-webpage-env.eba-be26ux72.eu-central-1.elasticbeanstalk.com/

## 📋 Project Overview

This is a basic Express.js application that serves a welcome page for AWS Elastic Beanstalk demonstration purposes. The application includes:

- A main landing page with deployment information
- A health check endpoint for AWS monitoring
- Responsive HTML styling
- Basic Express.js server configuration

## 🏗️ Architecture

- **Runtime:** Node.js
- **Framework:** Express.js ^5.1.0
- **Platform:** AWS Elastic Beanstalk
- **Region:** eu-central-1
- **Deployment:** Manual S3 upload (zip file)

## 📁 Project Structure

```
project-root/
├── app.js              # Main application file
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Dependency lock file
└── README.md          # This file
```

## 🚀 Local Development

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm

### Installation

1. Clone or download the project files
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4000`

## 📦 Dependencies

- **express:** ^5.1.0 - Web framework for Node.js

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (defaults to 4000 if not specified)

### Available Scripts
- `npm start`: Start the production server
- `npm test`: Run tests (currently not implemented)

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Main landing page with application information |
| `/health` | GET | Health check endpoint returning JSON status |

### Health Check Response
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🚀 AWS Elastic Beanstalk Deployment

### Current Deployment Method: Manual S3 Upload

This application was deployed using the manual zip upload method:

zip -r application.zip . -x "*.git*" "node_modules/*"

#### Steps Performed:
1. **Prepare Application Package:**
   - Created a zip file containing all project files
   - Included: `app.js`, `package.json`, `package-lock.json`
   - Excluded: `node_modules`, `.git`, and other unnecessary files

2. **Elastic Beanstalk Configuration:**
   - **Application Name:** [Your Application Name]
   - **Environment Name:** elastic-webpage-env
   - **Platform:** Node.js
   - **Region:** eu-central-1

3. **Deployment Process:**
   - Accessed AWS Elastic Beanstalk Console
   - Created new application
   - Uploaded zip file manually through S3
   - Configured environment settings
   - Deployed application

#### Environment Details:
- **Environment URL:** elastic-webpage-env.eba-be26ux72.eu-central-1.elasticbeanstalk.com
- **Load Balancer:** Application Load Balancer
- **Instance Type:** t3.micro (or as configured)
- **Auto Scaling:** Enabled

## 🔍 Monitoring & Health

The application includes a dedicated health check endpoint (`/health`) that AWS Elastic Beanstalk uses to monitor application health. This endpoint returns:
- HTTP 200 status code
- JSON response with current timestamp
- Application status information

## 📝 Features

- **Responsive Design:** Clean, mobile-friendly interface
- **AWS Integration:** Optimized for Elastic Beanstalk deployment
- **Health Monitoring:** Built-in health check endpoint
- **Error Handling:** Basic Express.js error handling
- **Environment Awareness:** Port configuration via environment variables

## 🔮 Future Enhancements

For subsequent iterations, consider:

- **CI/CD Pipeline:** Integrate with GitHub for automated deployments
- **Database Integration:** Add RDS or DynamoDB for data persistence  
- **Environment Variables:** Use AWS Systems Manager Parameter Store
- **Logging:** Implement CloudWatch logging
- **SSL/TLS:** Configure HTTPS with AWS Certificate Manager
- **Custom Domain:** Map to a custom domain name
- **Monitoring:** Add CloudWatch dashboards and alarms

## 🛠️ Troubleshooting

### Common Issues:

1. **Application Not Starting:**
   - Check that `package.json` includes correct start script
   - Verify Node.js version compatibility
   - Review Elastic Beanstalk logs in AWS Console

2. **Port Binding Issues:**
   - Ensure application listens on `process.env.PORT`
   - Default port should be configurable

3. **Health Check Failures:**
   - Verify `/health` endpoint returns 200 status
   - Check application logs for errors

### Log Access:
- AWS Console → Elastic Beanstalk → Environment → Logs
- Download full logs for detailed troubleshooting

## 📚 Additional Resources

- [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)

## 📧 Notes for Future Reference

- **Deployment Date:** [Add your deployment date]
- **AWS Account:** [Your AWS account details]
- **Costs:** Monitor AWS billing for Elastic Beanstalk usage
- **Backup:** Consider regular application version backups
- **Security:** Review security groups and IAM roles periodically

---

**Last Updated:** [Current Date]  
**Version:** 1.0.0  
**Deployment Method:** Manual S3 Upload
