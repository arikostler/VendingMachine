#!/bin/bash

sudo mysql VendingMachine < export_tables.sql
sudo mv /tmp/product_info.csv /home/arik/VendingMachine/dump/product_info.csv
sudo mv /tmp/sales.csv /home/arik/VendingMachine/dump/sales.csv
sudo chown arik -R /home/arik/VendingMachine/dump
