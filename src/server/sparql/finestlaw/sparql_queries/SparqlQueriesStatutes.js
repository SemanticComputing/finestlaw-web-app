const perspectiveID = 'statutes'

const getSectionLabel = (labelVar) => {
  return `
    BIND(
      COALESCE(
        IF(STRSTARTS(?section_prefLabel_, "osa"), "", 1/0),
        IF(STRSTARTS(?section_prefLabel_, "luku"), "", 1/0),
        IF(STRSTARTS(?section_prefLabel_, "pykälä"), "", 1/0),
        ?section_prefLabel_
      ) as ${labelVar}
    )
`
}

const sectionBlock = `
  UNION
  {
    ?id lss:section ?firstLevel__secondLevel__section__id .
    ?firstLevel__secondLevel__section__id lss:part_number ?firstLevel__id ;
                                          lss:part_number_int ?firstLevel__integer ;
                                          lss:chapter_number ?firstLevel__secondLevel__id ;
                                          lss:chapter_number_int ?firstLevel__secondLevel__integer ;
                                          lss:section_number ?firstLevel__secondLevel__section__sectionNumber ;
                                          lss:section_number_int ?firstLevel__secondLevel__section__sectionNumberInt ;
                                          skos:prefLabel ?section_prefLabel_ .
    BIND(CONCAT("Osa ", ?firstLevel__id) as ?firstLevel__prefLabel)
    BIND(CONCAT(?firstLevel__secondLevel__id, " luku") as ?firstLevel__secondLevel__prefLabel)
    ${getSectionLabel('?firstLevel__secondLevel__section__prefLabel')}
    BIND(?firstLevel__secondLevel__id as ?firstLevel__secondLevel__section__chapterNumber)
    BIND(CONCAT("/statutes/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?firstLevel__secondLevel__section__dataProviderUrl)
    BIND(true as ?hasParts)
    BIND(true as ?hasChapters)
  }
  UNION
  {
    ?id lss:section ?firstLevel__section__id .
    ?firstLevel__section__id lss:chapter_number ?firstLevel__id ;
                             lss:chapter_number_int ?firstLevel__integer ;
                             lss:section_number ?firstLevel__section__sectionNumber ;
                             lss:section_number_int ?firstLevel__section__sectionNumberInt ;
                             skos:prefLabel ?section_prefLabel_ .
    BIND(CONCAT(?firstLevel__id, " luku") as ?firstLevel__prefLabel)
    ${getSectionLabel('?firstLevel__section__prefLabel')}
    BIND(?firstLevel__id as ?firstLevel__section__chapterNumber)
    BIND(CONCAT("/statutes/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?firstLevel__section__dataProviderUrl)
    BIND(false as ?hasParts)
    BIND(true as ?hasChapters)
    FILTER NOT EXISTS {
      ?firstLevel__section__id lss:part_number [] .
    }
  }
  UNION
  {
    ?id lss:section ?firstLevel__id .
    ?firstLevel__id lss:section_number_int ?firstLevel__sectionNumberInt ;
                    lss:section_number ?firstLevel__sectionNumber ;
                    skos:prefLabel ?section_prefLabel_ .
    ${getSectionLabel('?firstLevel__prefLabel')}
    BIND(?firstLevel__sectionNumberInt as ?firstLevel__integer)
    BIND(CONCAT("/statutes/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?firstLevel__dataProviderUrl)
    BIND(false as ?hasParts)
    BIND(false as ?hasChapters)
    FILTER NOT EXISTS {
      VALUES ?prop { lss:part_number lss:chapter_number }
      ?firstLevel__id ?prop [] .
    }
  }
`

export const statuteProperties = `
    {
      ?id skos:prefLabel ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)

      # create link for React Router:
      BIND(CONCAT("/statutes/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?prefLabel__dataProviderUrl)
      # create link to SAHA
      BIND(?id as ?uri__prefLabel)
      BIND(?id as ?uri__dataProviderUrl)
    }
    UNION
    {
      ?id eli:type_document ?statuteType__id .
      ?statuteType__id skos:prefLabel ?statuteType__prefLabel . 
    }
    UNION
    {
      ?id dc:source ?source .
    }
    UNION
    {
      ?id lss:timespan ?enforcementDate__id .
      ?enforcementDate__id skos:prefLabel ?enforcementDate__prefLabel . 
    }
    UNION
    {
      ?id fe:eurovoc_keyword ?keyword__id .
      ?keyword__id skos:prefLabel ?keyword__prefLabel .
      ?keyword__id skos:exactMatch ?keyword__dataProviderUrl .
    }
    UNION
    {
      ?id eli:transposes ?euDirective__id .
      ?euDirective__id skos:prefLabel ?euDirective__prefLabel .
      BIND(?euDirective__id as ?euDirective__dataProviderUrl)
    }
    UNION
    {
      ?id lss:html ?html_ .
      BIND(REPLACE(?html_, "<html>|</html>|<head />|<body>|</body>", "") as ?contentHTML)
    }
    ${sectionBlock}
`

export const knowledgeGraphMetadataQuery = `
  SELECT * 
  WHERE {
    ?id a sd:Dataset ;
        dct:title ?title ;
        dct:publisher ?publisher ;
        dct:rightsHolder ?rightsHolder ;
        dct:modified ?modified ;
        dct:source ?databaseDump__id .
    ?databaseDump__id skos:prefLabel ?databaseDump__prefLabel ;
                      mmm-schema:data_provider_url ?databaseDump__dataProviderUrl ;
                      dct:modified ?databaseDump__modified .
  }
`