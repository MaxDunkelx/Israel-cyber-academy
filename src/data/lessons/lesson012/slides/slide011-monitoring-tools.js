export const slide11MonitoringTools = {
  id: "slide-11",
  type: "content",
  title: "כלי ניטור ואבטחת ענן - Cloud Monitoring & Security Tools 🔍",
  content: {
    sections: [
      {
        title: "כלי ניטור ענן",
        items: [
          {
            tool: "AWS CloudWatch",
            features: ["Metrics", "Logs", "Alarms", "Dashboards"],
            security: ["Access Logs", "API Calls", "User Activity", "System Events"],
            integration: ["Lambda Functions", "SNS Notifications", "Auto Scaling"]
          },
          {
            tool: "Azure Monitor",
            features: ["Application Insights", "Log Analytics", "Metrics", "Alerts"],
            security: ["Security Center", "Sentinel", "Defender", "Compliance"],
            capabilities: ["Real-time Monitoring", "Machine Learning", "Automation"]
          },
          {
            tool: "Google Cloud Monitoring",
            features: ["Stackdriver", "Logging", "Error Reporting", "Trace"],
            security: ["Security Command Center", "Asset Inventory", "Threat Detection"],
            integration: ["Kubernetes", "App Engine", "Compute Engine"]
          }
        ]
      },
      {
        title: "כלי אבטחת ענן",
        items: [
          {
            category: "Cloud Access Security Broker (CASB)",
            tools: ["Netskope", "McAfee MVISION", "Symantec CASB", "Microsoft Defender for Cloud Apps"],
            features: ["Shadow IT Discovery", "Data Loss Prevention", "Threat Protection", "Compliance"]
          },
          {
            category: "Cloud Security Posture Management (CSPM)",
            tools: ["Prisma Cloud", "AWS Config", "Azure Security Center", "Google Security Command Center"],
            features: ["Configuration Monitoring", "Compliance Checking", "Risk Assessment", "Remediation"]
          },
          {
            category: "Cloud Workload Protection Platform (CWPP)",
            tools: ["Trend Micro Cloud One", "CrowdStrike Falcon", "SentinelOne", "Carbon Black"],
            features: ["Runtime Protection", "Vulnerability Management", "Compliance", "Threat Detection"]
          }
        ]
      },
      {
        title: "כלי ניתוח לוגים",
        items: [
          {
            tool: "Splunk",
            features: ["Log Analysis", "Real-time Monitoring", "Machine Learning", "Visualization"],
            useCases: ["Security Monitoring", "Performance Analysis", "Compliance Reporting"]
          },
          {
            tool: "ELK Stack",
            components: ["Elasticsearch", "Logstash", "Kibana"],
            features: ["Log Aggregation", "Search", "Visualization", "Alerting"]
          },
          {
            tool: "Datadog",
            features: ["Infrastructure Monitoring", "APM", "Log Management", "Synthetic Monitoring"],
            cloud: ["Multi-cloud Support", "Container Monitoring", "Serverless Monitoring"]
          }
        ]
      },
      {
        title: "כלי אוטומציה ואבטחה",
        items: [
          {
            tool: "Terraform",
            description: "Infrastructure as Code",
            security: ["State Encryption", "Access Control", "Audit Trails", "Policy Enforcement"]
          },
          {
            tool: "Ansible",
            description: "Configuration Management",
            security: ["Vault Encryption", "Role-based Access", "Audit Logs", "Secure Communication"]
          },
          {
            tool: "Chef",
            description: "Automation Platform",
            security: ["Data Bags Encryption", "RBAC", "Audit Logging", "Compliance"]
          }
        ]
      }
    ],
    tips: [
      "בחרו כלים שמתאימים לתשתית שלכם",
      "שלבו כלי ניטור ואבטחה",
      "אוטומטו תהליכי אבטחה",
      "ניטרו כל פעילות חשודה"
    ]
  }
}; 