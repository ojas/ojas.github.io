<?php

	$f = $_GET["ForumId"];
	$sf = $_GET["SortField"];
	$so = $_GET["SortOrder"];

	$xp = new XsltProcessor();

	$xsl = new DomDocument;
  $xsl->load('ViewForums.xslt');
  
  // import the XSL styelsheet into the XSLT process
  $xp->importStylesheet($xsl);

 // create a DOM document and load the XML datat
  $xml_doc = new DomDocument;
  $xml_doc->load('NSXSCForums.xml');

	if ($f)
		$xp->setParameter('', 'Request.ForumId', $f);		

	if ($sf)
		$xp->setParameter('', 'Request.SortField', $sf);		

	if ($so)
		$xp->setParameter('', 'Request.SortOrder', $so);		
/*
 $xp->setParameter($namespace, 'id1', 'value1');
  $xp->setParameter($namespace, 'id2', 'value2');


 $params['id1'] = 'value1';
  $params['id2'] = 'value2';
  // ....
  $xp->setParameter($namespace, $params);
*/

 if ($html = $xp->transformToXML($xml_doc)) {
      echo $html;
  } else {
      trigger_error('XSL transformation failed.', E_USER_ERROR);
  } // if 

/*	
		object requestForumId = Request.QueryString["ForumId"];

		object requestSortField = Request.QueryString["SortField"];

		object requestSortOrder = Request.QueryString["SortOrder"];



		XPathDocument myXPathDoc = new XPathDocument(Server.MapPath("NSXSCForums.xml"));

		XslTransform myXslTrans = new XslTransform() ;

		myXslTrans.Load(Server.MapPath("ViewForums.xslt"));

		XsltArgumentList args = new XsltArgumentList();



		if ( requestForumId != null )

			args.AddParam ( "Request.ForumId", String.Empty, requestForumId );



		if ( requestSortField != null )

			args.AddParam ( "Request.SortField", String.Empty, requestSortField );



		if ( requestSortOrder != null )

			args.AddParam ( "Request.SortOrder", String.Empty, requestSortOrder );

		myXslTrans.Transform(myXPathDoc, args, Response.OutputStream,null);
*/
?>
