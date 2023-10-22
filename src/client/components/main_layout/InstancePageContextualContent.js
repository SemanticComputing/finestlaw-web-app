import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import SectionOfALawListCollapsible from '../facet_results/SectionOfALawListCollapsible'
import HTMLParser from '../../helpers/HTMLParser'
import Typography from '@mui/material/Typography'
import { useLocation } from 'react-router-dom'
import { has } from 'lodash'
import intl from 'react-intl-universal'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#bdbdbd'
  },
  mainContainer: props => ({
    margin: 0,
    maxWidth: 1600,
    marginTop: theme.spacing(0.5),
    flexWrap: 'wrap-reverse',
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: `calc(100% - ${theme.spacing(0.5)}`
    }
  }),
  gridItem: props => ({
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: '100%'
    },
    paddingTop: '0px !important',
    paddingBottom: '0px !important'
  }),
  textOuterContainer: props => ({
    height: 400,
    overflow: 'auto',
    marginTop: -8,
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: '100%',
      marginTop: 'initial'
    }
  }),
  textInnerContainer: {
    padding: theme.spacing(2)
  },
  tableOfContents: props => ({
    padding: theme.spacing(2),
    overflow: 'auto',
    height: 180,
    top: theme.spacing(0.5),
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: 'calc(60% - 72px)'
    }
  }),
  wordCloud: props => ({
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    overflow: 'auto',
    height: 200,
    display: 'none',
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: '40%',
      display: 'block'
    }
  }),
  wordCloudContainer: {
    width: '100%'
  },
  tooltip: {
    maxWidth: 500
  },
  tooltipContent: {
    padding: theme.spacing(1)
  },
  tooltipList: {
    listStylePosition: 'inside',
    paddingLeft: 0
  },
  disclaimer: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    fontStyle: 'italic'
  }
}))

const tranlationDisclaimer = "Disclaimer: Texts are machine-translated. Verify for accuracy and use at your own risk."

const InstancePageContextualContent = props => {
  const classes = useStyles(props)
  let { data } = props
  const { tableOfContents, hasParts, hasChapters, source} = props
  const {
    makeLink, externalLink, sortValues, sortBy, numberedList, columnId, linkAsButton,
    showSource, sourceExternalLink
  } = props.tableOfContentsConfig || {}
  const location = useLocation()
  const sectionRefs = useRef({})
  const langTag = useSelector(state => state.options.currentLocale)

  const showTranslationDisclaimer = () => {
    let isShown = false
    if (source === "FIN") {
        if (langTag !== "fi") {
            isShown = true
        }
    } else {
        if (langTag === "fi") {
            isShown = true
        }
    }
    return isShown
  }
  
  // Fuseki splits long HTML texts, combine them here
  if (Array.isArray(data)) {
    data = data.join('')
    //data = unescape(encodeURIComponent(data)).replace('<?xml version="1.0" encoding="UTF-8"?>', '').trim()
    //data = decodeURIComponent(data).replace('<?xml version="1.0" encoding="UTF-8"?>', '').trim().replace(/\n|\t/g, '')
    //data = false
  }
  data = data.replace('<?xml version="1.0" encoding="UTF-8"?>', '').trim().replace(/\n|\t/g, '')
  try {
    data = decodeURIComponent(data)
  } catch (e) {
    data = data
  }

  const parser = new HTMLParser({ ...props, classes, sectionRefs, langTag })
  data = parser.parseHTML(data)

  useEffect(() => {
    if (tableOfContents && location.hash) {
      setTimeout(() => {
        const ref = sectionRefs.current
        if (has(ref, location.hash)) {
          ref[location.hash].scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    }
  }, [location.hash])

  return (
    <div className={classes.root}>
      <Grid className={classes.mainContainer} container spacing={1}>
        <Grid className={classes.gridItem} item xs={12} sm={12} md={8}>
          <Paper className={classes.textOuterContainer}>
            {showTranslationDisclaimer() ? <Typography className={classes.disclaimer} variant='body2' color='textWarning' component='p'>{tranlationDisclaimer}</Typography> : null}
            <div className={classes.textInnerContainer}>
              {data}
            </div>
          </Paper>
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={12} md={4}>
          {tableOfContents &&
            <Paper className={classes.tableOfContents}>
              <>
                <Typography variant='h6' component='h2'>{intl.get('firstLevel.tableOfContents')}</Typography>
                <SectionOfALawListCollapsible
                  data={tableOfContents}
                  hasParts={hasParts === 'true'}
                  hasChapters={hasChapters === 'true'}
                  makeLink={makeLink}
                  externalLink={externalLink}
                  sortValues={sortValues}
                  sortBy={sortBy}
                  numberedList={numberedList}
                  columnId={columnId}
                  expanded
                  linkAsButton={linkAsButton}
                  showSource={showSource}
                  sourceExternalLink={sourceExternalLink}
                  collapsible={false}
                  onlyHashLinks
                />
              </>
            </Paper>}
        </Grid>
      </Grid>
    </div>
  )
}

export default InstancePageContextualContent
