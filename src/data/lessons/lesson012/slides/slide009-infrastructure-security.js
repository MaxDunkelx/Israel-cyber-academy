export const slide9InfrastructureSecurity = {
  id: "slide-9",
  type: "content",
  title: "אבטחת תשתיות ענן - Cloud Infrastructure Security 🏗️",
  content: {
    sections: [
      {
        title: "אבטחת רשת ענן",
        items: [
          {
            component: "Virtual Private Cloud (VPC)",
            description: "רשת פרטית וירטואלית בענן",
            features: ["בידוד רשת", "ניהול IP", "תצורת Firewall", "VPN"],
            providers: ["AWS VPC", "Azure VNet", "Google VPC"]
          },
          {
            component: "Network Security Groups (NSG)",
            description: "כללי אבטחה ברמת הרשת",
            features: ["בקרת תעבורה", "הרשאות IP", "ניטור", "לוגים"],
            configuration: ["Inbound Rules", "Outbound Rules", "Priority Levels"]
          },
          {
            component: "Load Balancer Security",
            description: "אבטחת מאזני עומס",
            features: ["SSL Termination", "Health Checks", "DDoS Protection", "WAF Integration"]
          }
        ]
      },
      {
        title: "אבטחת שרתים וירטואליים",
        items: [
          {
            security: "Instance Security",
            measures: ["Security Groups", "Key Pairs", "IAM Roles", "Encryption"],
            bestPractices: ["עדכונים קבועים", "הרשאות מינימליות", "ניטור פעילות"]
          },
          {
            security: "Container Security",
            measures: ["Image Scanning", "Runtime Protection", "Network Policies", "Secrets Management"],
            tools: ["Docker Security", "Kubernetes RBAC", "Harbor Registry"]
          },
          {
            security: "Serverless Security",
            measures: ["Function Permissions", "Environment Variables", "API Gateway", "Event Sources"],
            considerations: ["Cold Start", "Execution Time", "Memory Limits"]
          }
        ]
      },
      {
        title: "אבטחת אחסון ענן",
        items: [
          {
            storage: "Object Storage Security",
            features: ["Bucket Policies", "Access Control Lists", "Encryption", "Versioning"],
            providers: ["AWS S3", "Azure Blob", "Google Cloud Storage"]
          },
          {
            storage: "Block Storage Security",
            features: ["Volume Encryption", "Snapshot Security", "Backup Encryption", "Access Control"],
            providers: ["AWS EBS", "Azure Disk", "Google Persistent Disk"]
          },
          {
            storage: "Database Security",
            features: ["Connection Encryption", "Authentication", "Authorization", "Audit Logs"],
            types: ["RDS", "NoSQL", "Data Warehouse"]
          }
        ]
      },
      {
        title: "ניטור ואבטחה",
        items: [
          {
            monitoring: "CloudWatch / Azure Monitor",
            features: ["Metrics", "Logs", "Alarms", "Dashboards"],
            security: ["Access Logs", "Error Logs", "Performance Monitoring"]
          },
          {
            monitoring: "Security Information and Event Management (SIEM)",
            tools: ["Splunk", "QRadar", "LogRhythm", "Exabeam"],
            integration: ["Cloud Logs", "API Calls", "User Activity", "System Events"]
          },
          {
            monitoring: "Threat Detection",
            services: ["AWS GuardDuty", "Azure Security Center", "Google Security Command Center"],
            capabilities: ["Anomaly Detection", "Threat Intelligence", "Automated Response"]
          }
        ]
      }
    ],
    tips: [
      "תכננו אבטחה מתחילת התכנון",
      "השתמשו בעקרונות Zero Trust",
      "ניטרו כל פעילות",
      "תעדו תצורות אבטחה"
    ]
  }
}; 