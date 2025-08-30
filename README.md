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


# CI/CD Setup Guide: GitHub Actions → S3 → Elastic Beanstalk

This guide will help you transition from manual deployment to automated CI/CD for your Elastic Beanstalk application.

## 🎯 Overview

The automated workflow will:
1. Trigger on every push to main branch
2. Install dependencies and run tests
3. Create a deployment package (zip file)
4. Upload to S3 bucket
5. Deploy to Elastic Beanstalk using S3 URL
6. Monitor deployment status

## 📋 Prerequisites

### 1. GitHub Repository Setup
First, create a GitHub repository and push your existing code:

```bash
# Initialize git repository (if not already done)
git init

# Add your files
git add app.js package.json package-lock.json

# Commit your code
git commit -m "Initial commit - working Elastic Beanstalk app"

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/your-username/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### 2. AWS IAM User for GitHub Actions

Create an IAM user with programmatic access and the following permissions:

#### Required IAM Policies:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::your-deployment-bucket",
                "arn:aws:s3:::your-deployment-bucket/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "elasticbeanstalk:CreateApplicationVersion",
                "elasticbeanstalk:UpdateEnvironment",
                "elasticbeanstalk:DescribeEnvironments",
                "elasticbeanstalk:DescribeApplicationVersions"
            ],
            "Resource": "*"
        }
    ]
}
```

### 3. S3 Bucket for Deployments

Create an S3 bucket for storing deployment packages:

```bash
# Using AWS CLI
aws s3 mb s3://your-deployment-bucket-name --region eu-central-1

# Enable versioning (recommended)
aws s3api put-bucket-versioning \
  --bucket your-deployment-bucket-name \
  --versioning-configuration Status=Enabled
```

## 🔐 GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

### Navigate to: Repository → Settings → Secrets and variables → Actions

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `AWS_ACCESS_KEY_ID` | Your IAM user access key | AWS credentials for GitHub Actions |
| `AWS_SECRET_ACCESS_KEY` | Your IAM user secret key | AWS credentials for GitHub Actions |
| `S3_BUCKET_NAME` | your-deployment-bucket-name | S3 bucket for storing deployment packages |
| `EB_APPLICATION_NAME` | Your EB application name | Name of your Elastic Beanstalk application |
| `EB_ENVIRONMENT_NAME` | elastic-webpage-env | Your EB environment name |

### Finding Your Application Name:
```bash
# List your Elastic Beanstalk applications
aws elasticbeanstalk describe-applications --region eu-central-1
```

## 📁 Project Structure After Setup

```
your-project/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── app.js                      # Your Express.js app
├── package.json               # Dependencies
├── package-lock.json          # Lock file
├── README.md                  # Documentation
└── .gitignore                 # Git ignore file
```

## 📝 Additional Files to Create

### 1. .gitignore
```gitignore
# Dependencies
node_modules/
npm-debug.log*

# Environment variables
.env
.env.local

# AWS
.aws/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Logs
logs/
*.log

# Deployment packages
*.zip
```

### 2. Updated package.json (add test script)
```json
{
  "name": "week3",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "echo \"No tests specified\" && exit 0",
    "dev": "node app.js"
  },
  "keywords": ["aws", "elastic-beanstalk", "nodejs", "express"],
  "author": "Your Name",
  "license": "ISC",
  "description": "Express.js app deployed on AWS Elastic Beanstalk",
  "dependencies": {
    "express": "^5.1.0"
  }
}
```

## 🚀 Deployment Workflow

### Automatic Deployment Process:

1. **Push to GitHub:** Any push to main branch triggers deployment
2. **Build:** GitHub Actions installs dependencies
3. **Package:** Creates zip file with timestamp
4. **Upload:** Uploads package to S3 bucket
5. **Deploy:** Creates new EB version and updates environment
6. **Monitor:** Waits for deployment completion and reports status

### Manual Trigger (if needed):
You can also trigger deployments manually:
- Go to your GitHub repository
- Click "Actions" tab
- Select "Deploy to AWS Elastic Beanstalk" workflow
- Click "Run workflow"

## 🔍 Monitoring Deployments

### GitHub Actions:
- Monitor progress in GitHub → Actions tab
- View logs for each step
- See success/failure status

### AWS Console:
- Elastic Beanstalk → Environments → Your Environment
- Check "Recent events" for deployment progress
- Monitor application health

### Command Line:
```bash
# Check environment status
aws elasticbeanstalk describe-environments \
  --environment-names elastic-webpage-env \
  --region eu-central-1

# View recent events
aws elasticbeanstalk describe-events \
  --environment-name elastic-webpage-env \
  --region eu-central-1 \
  --max-items 20
```

## 🐛 Troubleshooting

### Common Issues:

1. **AWS Credentials Error:**
   - Verify GitHub secrets are correctly set
   - Check IAM user permissions

2. **S3 Upload Fails:**
   - Confirm S3 bucket exists and is accessible
   - Check bucket name in secrets

3. **Elastic Beanstalk Deployment Fails:**
   - Verify application and environment names
   - Check if environment is in a healthy state
   - Review EB logs in AWS console

4. **Application Health Issues:**
   - Ensure `/health` endpoint works locally
   - Check if app listens on correct port (`process.env.PORT`)

## 🎉 Benefits of Automation

- **Consistency:** Same deployment process every time
- **Speed:** Faster deployments compared to manual process
- **Rollback:** Easy to revert to previous versions
- **Visibility:** Clear deployment logs and status
- **Integration:** Automatic testing before deployment

## 🔄 Next Steps

After setting up automation:

1. **Test the Pipeline:** Make a small change and push to trigger deployment
2. **Add Testing:** Implement unit tests in your application
3. **Environment Management:** Consider separate staging and production environments
4. **Monitoring:** Set up CloudWatch alarms for your application
5. **Security:** Implement environment-specific configurations

---

**Note:** This automation setup earns the additional 10 marks mentioned in the lab rubrics for GitHub Actions integration!
