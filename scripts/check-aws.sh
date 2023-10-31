#!/usr/bin/env bash

# this bash script checks if there is a aws cli installation
# if there is not, it will install it

set -e

# check if there is a previous aws cli installation
EXISTS=$(which aws)

if [ -z "$EXISTS" ]; then
    cd /tmp
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    ./aws/install
else
    echo "aws already installed"
fi