#!/bin/bash
logName="`date +%Y-%m-%d_%H.%M.%S`"
node ../server &> $logName.log