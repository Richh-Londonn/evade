
provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "evade-frontend-bucket"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_eks_cluster" "evade_cluster" {
  name     = "evade-cluster"
  role_arn = "arn:aws:iam::123456789012:role/eks-cluster-role"

  vpc_config {
    subnet_ids = ["subnet-abc123", "subnet-def456"]
  }
}

resource "aws_rds_instance" "evade_db" {
  allocated_storage    = 20
  engine               = "mysql"
  instance_class       = "db.t3.micro"
  name                 = "evadedb"
  username             = "admin"
  password             = "password123"
  publicly_accessible  = true
}
