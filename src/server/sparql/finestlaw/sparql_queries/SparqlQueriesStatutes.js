const perspectiveID = 'statutes'

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
      ?id lss:text ?statuteText . 
      FILTER (LANG(?statuteText) = 'en')
    }
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
