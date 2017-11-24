/*
	Copyright 2002 Ojas J. Patel
	Based on information from nsxprime.com
*/

function NSXVIN ( vin )
{
	this.vin = vin;
	
	this.vinInfo =
	{
		country :
			{
				name : 'country',
				position : 1,
				values : { J : 'Japan' }
			},
		manufacturer :
			{
				name : 'manufacturer',
				position : 2,
				values : { H : 'Honda' }
			},
		make :
			{
				name : 'make',
				position : 3,
				values : { 4 : 'Passenger car, gasoline engine' }
			},
		engine :
			{
				name : 'engine',
				position : "4-6",
				values : { 'NA1' : '3.0L (C30A)', 'NA2' : '3.2L (C32B)' }
			},
		bodyAndTransmission :
			{
				name : 'body and transmission',
				position : 7,
				values : { 1 : '2-door manual', 2 : '2-door automatic' }
			},
		trim :
			{
				name : 'trim',
				position : 8,
				values : {
					2: '1999 Zanardi Edition (Coupe with Manual Steering, Dual Airbag, Active Belt)',
					3: '1997+ NSX Coupe with Power Steering, Dual Airbag, Active Belt',
					5: '1991-1995 NSX Coupe with Manual Steering, Driver Airbag, Active Belt',
					6: '1997+ NSX-T with Power Steering, Driver Airbag, Active Belt',
					8: '1995-1996 NSX-T with Power Steering, Dual Airbags, Active Belt'
					}
			},
		checkDigit :
			{
				name : 'check digit',
				position : 9,
				checkDigit : 1
			},
		modelYear :
			{
				name : 'model year',
				position : 10,
				values : {
					M: 1991, N: 1992, P: 1993, R: 1994, S: 1995,
					T: 1996, V: 1997, W: 1998, X: 1999, Y: 2000,
					1: 2001, 2: 2002, 3: 2003, 4: 2004, 5: 2005,
					6: 2006, 7: 2007, 8: 2008, 9: 2009, A: 2010,
					B: 2011, C: 2012, D: 2013, E: 2014, F: 2015
					}
			},
		assemblyPlant :
			{
				name : 'assembly plant',
				position : 11,
				values : { T : 'Tochigi, Japan', S : 'Suzuka, Japan' }
			},
		serialNumber :
			{
				name : 'serial number',
				position : "12-17",
				serialNumber : 1
			}
	};

	this.decode = function()
	{
		var v = new String(this.vin);
		v = v.toUpperCase();
		
		for (field in this.vinInfo)
		{
			var ele = this.vinInfo[field];
			var pos = new String(ele.position);
			pos = pos.split("-");
			if (pos.length==1) pos[1] = pos[0];

			var val = v.substring(pos[0]-1, pos[1]);
			var txt;
			var err = false;
			var errTxt = null;

			if (ele.serialNumber)
			{
				err = val.length!=6 || isNaN(val);
				if (err)
				{
					errTxt = "must be numeric and exactly 6 digits in length"
				}
				else
				{
					txt = "okay"
				}
			}
			else if (ele.checkDigit)
			{
				var calcdDigit = this.calculateCheckDigit();
				err = calcdDigit!=val;
				if (err)
				{
					if (calcdDigit!=null)
						errTxt = 'should be ' + calcdDigit
					else
						errTxt = '';
				}
				else
				{
					txt = "okay";
				}
				
			}
			else if (ele.values)
			{
				var textVal = ele.values[val];
				err = typeof (textVal)=="undefined";
				if (err)
				{
					var availVals = [];
					for (a in ele.values)
						availVals[availVals.length] = a;
					errTxt = "must be: " + availVals.join(',')
				}
				else
				{
					txt = textVal;
				}
			}
			else
			{
				txt = '?'
			}
			
			this[field] =
			{
				value : val,
				text : err ? "invalid. " : txt,
				error : err,
				errorText : errTxt
			}
		}
	}
	

	this.lengthOkay = function()
	{
		return this.vin.length==17;
	}
	
	this.calculateCheckDigit = function()
	{
		var v = new String(this.vin);
		v = v.toUpperCase();
		if (v.length!=17) return null;
		var digitValues =
		{
			A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8,
			J:1, K:2, L:3, M:4, N:5,      P:7,      R:9,
			     S:2, T:3, U:4, V:5, W:6, X:7, Y:8, Z:9,
			1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 0:0
		}
		var positionWeight = [8,7,6,5,4,3,2,10,null,9,8,7,6,5,4,3,2];
		var t = 0;
		for (var i=0;i<positionWeight.length;i++)
		{
			var weight = positionWeight[i];
			if (weight != null)
			{
				t+=weight* digitValues[v.substr(i,1)];
			}
		}
		if (isNaN(t)) return null;
		t = t % 11;
		if (t==10) t = 'X';
		return t;
	}
}