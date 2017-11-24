<?xml version="1.0" ?>



<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" >



	<!-- OJP 8/16/2006, changed links to use archive.org since nsxca.org site is no longer up -->



	<xsl:output

		doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"

		doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"

		omit-xml-declaration="no"

		media-type="text/xml"

		method="xml"

		/>



	<xsl:param name="Request.ForumId" />

	<xsl:param name="PageHits" />
	<xsl:param name="Base" select="'/nsx/mirror/nsxsc/forums'" />

	<xsl:param name="Request.SortField" select="'TopicId'" />

	<xsl:param name="Request.SortOrder" select="'descending'" />



	<xsl:template match="/">

		<html>

			<head>

				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

				<meta name="author" content="ojas" />

				<meta name="description" content="NSXSC.com Forums Index" />

				<meta name="keywords" content="NSXSC.com Forums Index" />

				<title>NSXSC.com Forums Index</title>

				<link rel="stylesheet" href="/nsx/report.css" />

				<link rel="shortcut icon" href="/ojas-icon.gif" />	

				<xsl:call-template name="html-head-style" />

			</head>

			<body>

				<div style="width:720px">

				<h1 class="flush">NSXSC.com Forums Index</h1>

				<xsl:choose>

					<xsl:when test="$Request.ForumId">

						<xsl:call-template name="show-forum">

							<xsl:with-param name="forumId" select="$Request.ForumId" />

							<xsl:with-param name="sortField" select="$Request.SortField" />

							<xsl:with-param name="sortOrder" select="$Request.SortOrder" />

						</xsl:call-template>

					</xsl:when>

					<xsl:otherwise>

						<xsl:call-template name="show-index" />

					</xsl:otherwise>

				</xsl:choose>

				<xsl:call-template name="footer" />

				</div>

			</body>

		</html>

	</xsl:template>

	

	<xsl:template name="show-index">

		<h2 class="flush">About</h2>

		<p>

			Sometime during mid-2003, the forum software on <a href="http://www.nsxsc.com/">NSX SC</a>,

			the second largest online NSX community at the time, was disabled.

			Although the content was still there, the dynamically genereated index was disabled.

			Because of this, it was no longer possible to access any threads without knowing the URL.

			Fortunately, it was very easy to build an index.

			<!--

			This is a mirror of NSXSC forum index pages I created in March of 2005 by using some of my computer hacking skillz.

			NSX enthusiasts used to have two major online NSX communities in which they could participate:

			<a href="http://www.nsxprime.com/">NSX Prime</a> and <a href="http://www.nsxsc.com/">NSX SC</a>.

			Although NSX Prime was probably more popular, NSX SC had tons of great information and had a group of hard-core NSXers who would regularly posted excellent technical articles.

			Then, in mid-2003, the administrator effectively "turned-off" the forums on NSX SC by disabling the dynamically generated portions of the software.

			Although the content was still there, there was no index.  

			-->

		</p>

		<p>

			Since the UBB forums software uses a simple sequential numbering scheme for file names, it was a trival task to download

			each thread and extract the title, date, and other information from the HTML.

			From this information, I generated an XML data file.

			Then, all that was needed was an XSLT-based viewer, which is what you are seeing right now.

			<!--

			So, I thought if I could download the threads, pulling the title, date, and other information out of the HTML to recreate an index would be a trival task.

			As it turned out, due to the sequential numbering scheme used by the UBB forums software, downloading the threads was a trival task as well.

			I just created a small program to download the threads, scrape some basic information out of the HTML, and output an XML data file.

			Once the XML file was generated, it was simply a matter of creating a XSLT-based viewer to generate a view that allows one to browse the forums.

			-->

		</p>

		<p>

			The forum index is below.

		</p>

		<p>

			I???d like to hear any feedback you may have.  You can either <a href="http://ojas.net/">contact ojas by email</a>

			or <a href="http://www.nsxprime.com/forums/showthread.php?t=25054">discuss on NSX Prime</a>.

			Just remember this index only provides <em>links</em> to content on <a href="http://www.nsxsc.com/">nsxsc.com</a>

			and almost none of the content on nsxsc.com was created by me.

		</p>

		<h2>

			<xsl:call-template name="header" />

			(<xsl:call-template name="total-topic-count" />)

		</h2>



		<table>

		<xsl:for-each select="/UbbSiteContent/Forums/*">

			<xsl:choose>

				<xsl:when test="name()='ForumCategory'">

					<tr>

						<th class="forumCat" colspan="2">

							<xsl:value-of select="." />

						</th>

					</tr>

				</xsl:when>

				<xsl:otherwise>

					<tr>

						<td>

							<a>

								<xsl:attribute name="href"><xsl:value-of select="$Base" />/<xsl:value-of select="@Id" /></xsl:attribute>

								<xsl:value-of select="." />

							</a>

						</td>

						<td style="text-align:right">

							<xsl:call-template name="topic-count">

								<xsl:with-param name="forumId" select="@Id" />

							</xsl:call-template>

						</td>

					</tr>

				</xsl:otherwise>

			</xsl:choose>

		</xsl:for-each>

		</table>

		<h2>Downloads</h2>

		<ul class="nil">

			<li><a class="download" href="{$Base}/../NSXSCForumsIndex.xml.zip">NSXSC.com Forums Index XML</a>:

				163 KB ZIP file, includes the XML data file I generated.</li>

		</ul>

	</xsl:template>

	

	<xsl:template name="show-forum">

		<xsl:param name="forumId" />

		<xsl:param name="sortField" />

		<xsl:param name="sortOrder" />



		<h2>

			<xsl:variable name="forum-node" select="/UbbSiteContent/Forums/Forum[@Id=$forumId]" />

			<xsl:call-template name="header" />  &gt;

			<a href="{$Base}/{$forum-node/@Id}"><xsl:value-of select="$forum-node" /></a>

			(<xsl:call-template name="topic-count">

				<xsl:with-param name="forumId" select="$forum-node/@Id" />

			</xsl:call-template>)

		</h2>



		<table>

			<tr>

				<th>Topic</th>

				<th>Date Created <!--&#8743;&#8744;--></th>

				<th>Author</th>

			</tr>

		<xsl:for-each select="/UbbSiteContent/Topics/Topic[ForumId=$forumId and Response='']">

			<!--select="*[name(.)=$sortKey]|@*[name(.)=$sortKey]" -->

			<xsl:sort

				select="*[name(.)=$sortField]"

				order="{$sortOrder}"/>

			<tr>

				<td>

					<a>

						<xsl:attribute name="href">http://web.archive.org/web/<xsl:value-of select="Url" /></xsl:attribute>

						<xsl:choose>

							<xsl:when test="Title=''">

								<em>(no title)</em>

							</xsl:when>

							<xsl:otherwise>

								<xsl:value-of select="Title" />

							</xsl:otherwise>

						</xsl:choose>

					</a>

				</td>

				<td>

					<xsl:choose>

						<xsl:when test="PostTime='?unknown?'">

							<em>(unknown)</em>

						</xsl:when>

						<xsl:otherwise>

							<xsl:value-of select="PostTime" />

						</xsl:otherwise>

					</xsl:choose>

				</td>

				<td>

					<xsl:choose>

						<xsl:when test="Author='?unknown?'">

							<em>(unknown)</em>

						</xsl:when>

						<xsl:otherwise>

							<xsl:value-of select="Author" />

						</xsl:otherwise>

					</xsl:choose>

				</td>

			</tr>

		</xsl:for-each>

		</table>

	</xsl:template>





	<xsl:template name="html-head-style">

		<style type="text/css">

			table

			{

				border-collapse: collapse;

				border-style: solid;

				border-color: #cccccc;;

				border-width: 0px 1px 1px 1px;

				margin:2px 0 6px 0;

				width:100%

			}

			td, th

			{

				padding:5px;

				margin:0px;

			}

			th

			{

				text-align:left;

				background-color:#eeeeee;

				border-top: 1px solid #cccccc;

				border-bottom: 1px solid #cccccc;

				font-weight:bold;

			}

			th.forumCat

			{

				background-color:#eeeeee;

				font-weight:normal;

			}

		</style>

	</xsl:template>

	

	<xsl:template name="header">

		Index of <a href="{$Base}">NSX Sports Car Message Forums</a>

	</xsl:template>



	<xsl:template name="footer">

		<div class="footer">

			<div class="contact">

				Created: 2005.03.17 by <a href="http://ojas.net/">ojas</a><br />

				Last updated: 2006.03.17<!--

				<xsl:value-of select="$PageHits" /> hits

				-->

				<!--

				Last updated: 2006.03.01

				-->

			</div>

			<a class="validator" href="http://validator.w3.org/check?uri=referer">valid XHTML</a>

		</div>

	</xsl:template>

	

	<xsl:template name="topic-count">

		<xsl:param name="forumId" />

		<xsl:variable name="topic-count" select="count(/UbbSiteContent/Topics/Topic[ForumId=$forumId and Response=''])" />

		<xsl:value-of select="$topic-count" /> topic<xsl:if test="$topic-count!=1">s</xsl:if>

	</xsl:template>



	<xsl:template name="total-topic-count">

		<xsl:variable name="topic-count" select="count(/UbbSiteContent/Topics/Topic[Response=''])" />

		<xsl:value-of select="$topic-count" /> topic<xsl:if test="$topic-count!=1">s</xsl:if>

	</xsl:template>



</xsl:stylesheet>

