# ESEE Website

## Features

### Φορολογικό Ημερολόγιο (Tax Calendar)
A comprehensive tax calendar feature that displays Greek tax obligations and deadlines from the Taxheaven RSS feed.

**Features:**
- Real-time RSS feed integration from Taxheaven.gr
- Monthly and yearly filtering
- Event type categorization (deadlines, payments, applications, forms, obligations)
- Visual indicators for overdue, today, and upcoming events
- Statistics dashboard showing event counts
- Responsive design with modern UI
- Refresh functionality to update data

**Access:** Navigate to `/tax-calendar` or use the "Φορολογικό Ημερολόγιο" link in the navigation menu.

## Deployment Guide

### Prerequisites

1. AWS Account with the following services configured:
   - S3 Bucket for static hosting
   - CloudFront Distribution
   - EC2 Instance for the backend server
   - RDS PostgreSQL database

2. GitHub repository with the following secrets configured:
   - `AWS_ACCESS_KEY_ID`: AWS IAM user access key
   - `AWS_SECRET_ACCESS_KEY`: AWS IAM user secret key
   - `AWS_S3_BUCKET`: Name of the S3 bucket for static files
   - `CLOUDFRONT_DISTRIBUTION_ID`: CloudFront distribution ID
   - `DATABASE_URL`: PostgreSQL connection string
   - `EC2_HOST`: EC2 instance public IP/hostname
   - `EC2_USER`: EC2 instance SSH user (e.g., ec2-user)
   - `SSH_PRIVATE_KEY`: SSH private key for EC2 access

### Environment Variables

Frontend (.env):
```
VITE_DATABASE_URL=postgresql://user:password@host:5432/dbname
VITE_AWS_ACCESS_KEY_ID=your_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_secret_key
```

Backend (server/.env):
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
PORT=3000
```

### Deployment Process

1. Push changes to the main branch
2. GitHub Actions will automatically:
   - Build the React application
   - Deploy frontend to S3/CloudFront
   - Deploy backend to EC2
   - Invalidate CloudFront cache

### Manual Deployment

1. Build frontend:
```bash
npm install
npm run build
```

2. Deploy backend:
```bash
cd server
npm install
pm2 start index.js --name server
```

### Infrastructure Setup

1. S3 Bucket:
   - Enable static website hosting
   - Configure bucket policy for public access
   - Enable CORS if needed

2. CloudFront:
   - Point to S3 bucket
   - Configure custom domain if needed
   - Set up SSL certificate

3. EC2 Instance:
   - Install Node.js and PM2
   - Configure security groups
   - Set up SSL with Nginx (optional)

4. RDS Database:
   - Configure security groups
   - Set up backup policy
   - Configure parameter groups

### Monitoring

- CloudWatch for AWS services monitoring
- PM2 for backend process monitoring
- CloudFront for CDN metrics
- RDS for database metrics

### Backup

- S3 versioning enabled
- RDS automated backups
- EC2 AMI backups
- Code backups via GitHub

### Security

- SSL/TLS encryption in transit
- RDS encryption at rest
- S3 server-side encryption
- IAM least privilege access
- Security groups configuration
- Regular security updates
# esee-cms
