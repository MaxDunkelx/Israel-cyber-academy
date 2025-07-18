export const slide24CodeEditor = {
  id: "slide-24",
  type: "interactive",
  title: "עורך קוד - סקריפטי אבטחת ענן 💻",
  content: {
    editorType: "code",
    title: "כתיבת סקריפטי אבטחה לענן",
    description: "כתבו סקריפטים לאוטומציה של משימות אבטחה בענן.",
    language: "python",
    templates: [
      {
        name: "בדיקת הרשאות S3",
        description: "סקריפט לבדיקת הרשאות לא מאובטחות ב-S3",
        code: `import boto3
import json

def check_s3_permissions():
    s3 = boto3.client('s3')
    
    # רשימת כל ה-buckets
    response = s3.list_buckets()
    
    for bucket in response['Buckets']:
        bucket_name = bucket['Name']
        
        # בדיקת הרשאות
        try:
            acl = s3.get_bucket_acl(Bucket=bucket_name)
            
            # בדיקה אם יש הרשאות ציבוריות
            for grant in acl['Grants']:
                grantee = grant['Grantee']
                if 'URI' in grantee and 'AllUsers' in grantee['URI']:
                    print(f"⚠️  Bucket {bucket_name} - הרשאות ציבוריות!")
                    
        except Exception as e:
            print(f"❌ שגיאה בבדיקת {bucket_name}: {e}")
    
    print("✅ בדיקת הרשאות S3 הושלמה")

# הפעלת הסקריפט
check_s3_permissions()`
      },
      {
        name: "ניטור שינויים ב-IAM",
        description: "סקריפט לניטור שינויים בהרשאות IAM",
        code: `import boto3
import json
from datetime import datetime

def monitor_iam_changes():
    iam = boto3.client('iam')
    cloudtrail = boto3.client('cloudtrail')
    
    # חיפוש אירועי IAM אחרונים
    response = cloudtrail.lookup_events(
        LookupAttributes=[
            {
                'AttributeKey': 'EventName',
                'AttributeValue': 'CreateUser'
            }
        ],
        StartTime=datetime.now(),
        MaxResults=10
    )
    
    print("📊 אירועי IAM אחרונים:")
    for event in response['Events']:
        print(f"⏰ {event['EventTime']}")
        print(f"👤 {event['EventName']}")
        print(f"🌐 {event['SourceIPAddress']}")
        print("---")
    
    # בדיקת משתמשים עם הרשאות מנהל
    users = iam.list_users()
    
    for user in users['Users']:
        policies = iam.list_attached_user_policies(UserName=user['UserName'])
        
        for policy in policies['AttachedPolicies']:
            if 'Administrator' in policy['PolicyName']:
                print(f"⚠️  משתמש {user['UserName']} - הרשאות מנהל!")

# הפעלת הסקריפט
monitor_iam_changes()`
      },
      {
        name: "בדיקת אבטחת VPC",
        description: "סקריפט לבדיקת הגדרות אבטחה ב-VPC",
        code: `import boto3
import json

def check_vpc_security():
    ec2 = boto3.client('ec2')
    
    # רשימת כל ה-VPCs
    vpcs = ec2.describe_vpcs()
    
    for vpc in vpcs['Vpcs']:
        vpc_id = vpc['VpcId']
        print(f"🔍 בדיקת VPC: {vpc_id}")
        
        # בדיקת Security Groups
        security_groups = ec2.describe_security_groups(
            Filters=[{'Name': 'vpc-id', 'Values': [vpc_id]}]
        )
        
        for sg in security_groups['SecurityGroups']:
            sg_name = sg['GroupName']
            
            # בדיקת הרשאות כניסה
            for rule in sg['IpPermissions']:
                if rule.get('IpRanges'):
                    for ip_range in rule['IpRanges']:
                        if ip_range['CidrIp'] == '0.0.0.0/0':
                            print(f"⚠️  Security Group {sg_name} - גישה פתוחה!")
        
        # בדיקת Flow Logs
        flow_logs = ec2.describe_flow_logs(
            Filters=[{'Name': 'resource-id', 'Values': [vpc_id]}]
        )
        
        if not flow_logs['FlowLogs']:
            print(f"⚠️  VPC {vpc_id} - אין Flow Logs!")
        else:
            print(f"✅ VPC {vpc_id} - Flow Logs פעילים")

# הפעלת הסקריפט
check_vpc_security()`
      }
    ],
    challenges: [
      {
        title: "כתבו סקריפט לבדיקת הרשאות",
        description: "כתבו סקריפט שבודק הרשאות לא מאובטחות בכל השירותים",
        hints: [
          "השתמשו ב-boto3",
          "בדקו הרשאות ציבוריות",
          "חפשו הרשאות מיותרות"
        ]
      },
      {
        title: "כתבו סקריפט לניטור",
        description: "כתבו סקריפט שמנטר שינויים בהגדרות אבטחה",
        hints: [
          "השתמשו ב-CloudTrail",
          "חפשו אירועים חשודים",
          "שלחו התראות"
        ]
      }
    ],
    tips: [
      "תמיד בדקו קוד לפני הפעלה",
      "השתמשו בהרשאות מינימליות",
      "תעדו כל שינוי",
      "בדקו לוגים באופן קבוע"
    ]
  }
}; 