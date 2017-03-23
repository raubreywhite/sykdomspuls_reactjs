source /home/raw996/dashboards/ops/scripts_environmental/environmental.sh || echo "No environmental file found"

mv /home/raw996/sykdomspuls/build /home/raw996/sykdomspuls/lege123
ncftpput -R -v -u "sykdomspulsen-test.fhi.no|riwh" -p $SYKDOMSPULS_TEST sykdomspulsen-test.fhi.no /wwwroot /home/raw996/sykdomspuls/lege123
rm -rf /home/raw996/sykdomspuls/lege123
