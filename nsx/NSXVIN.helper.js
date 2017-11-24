function doCheck(f)
{
	var s = new NSXVIN (f.elements["VIN"].value);
	s.decode();
	var html = "<tr><th>field</td><th>value</td><th>description</td></tr>" +
		nameValueHTML ('country', s.country) +
		nameValueHTML ('manufacturer', s.manufacturer) +
		nameValueHTML ('make', s.make) +
		nameValueHTML ('engine', s.engine) +
		nameValueHTML ('body &amp; transmission', s.bodyAndTransmission) +
		nameValueHTML ('trim', s.trim) +
		nameValueHTML ('check digit', s.checkDigit) +
		nameValueHTML ('model year', s.modelYear) +
		nameValueHTML ('assembly plant', s.assemblyPlant) +
		nameValueHTML ('serial number', s.serialNumber) +
		'';
	document.getElementById("VINInfo").innerHTML = '<table>' + html + '</table>';
};


function nameValueHTML (n, v, v2)
{
	return '<tr>' +
		'<td>' + n + '</td>' +
		'<td>' + v.value + '</td>' +
		'<td>' + ( v.error ? ( v.text + ' <i>' + v.errorText + "</i>") : v.text ) + '</td>' +
		'</tr>';
}
