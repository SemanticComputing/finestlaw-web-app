import React from "react";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    fontSize: "1rem",
  },
  bold: {
    fontWeight: "bold",
  },
  link: {
    "&:hover": {
      fontStyle: "italic",
    },
    fontWeight: "bold",
    textDecoration: "none",
  },
  noBoldLink: {
    "&:hover": {
      fontStyle: "italic",
    },
    textDecoration: "none",
  },
}));

const TopBarInfoPage = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>About the Portal</h2>
      <p>
        The Nordic-Baltic project{" "}
        <span className={classes.bold}>
          “Achieving the World’s Smoothest Cross-Border Mobility and Daily Life
          Through Digitalisation”
        </span>{" "}
        was launched in 2021 and it will continue until the end of the year
        2023. The project has looked at cross-border data exchanges and data
        mobility through three different work packages, one of which (WP3) is
        the versatile use of the Nordic and Baltic legal databases. The project
        has been financed by the Nordic Council of Ministers and the
        Cross-border Digital Services (CDBS) programme.
      </p>
      <p>
        The evaluation of the current situation of cross-border data exchange
        including the access to legislative data in the Nordic and Baltic
        countries was carried out in February–August 2021. The result of this
        fact-finding mission was published as the{" "}
        <a
          target="_blank"
          className={classes.link}
          href="https://www.norden.org/en/publication/baseline-study-cross-border-data-exchange-nordic-and-baltic-countries "
        >
          “Baseline study of cross-border data exchange in the Nordic and Baltic
          countries”
        </a>
        .
      </p>
      <p>
        As a next step toward the joint search interface, the so-called Pre
        Proof-of-Concept study was carried out in 2022. It will be available on
        the project pages of the project{" "}
        <a
          target="_blank"
          className={classes.link}
          href="https://wiki.dvv.fi/pages/viewpage.action?pageId=117377490"
        >
          “Achieving the World’s Smoothest Cross-Border Mobility and Daily Life
          Through Digitalisation”
        </a>
      </p>
      <p>
        The Proof-of Concept{" "}
        <span className={classes.bold}>
          “FINEST-Law-Sampo - Finnish and Estonian Legislation on the Semantic
          Web”
        </span>{" "}
        portal is performed to map out what data requirements a common interface
        between countries will have and what would be required of any Nordic or
        Baltic country interested in participating in the common search
        interface development in the future. The PoC solution is based on the
        minimum viable product introduced in the Pre-PoC study and it is built
        on existing search interfaces. FINEST-Law-Sampo utilises the LawSampo
        platform. Based on the results of both the PoC, as well as the
        Cost-Benefit Analysis, a more detailed plan and roadmap will be created
        for possible future development.
      </p>
      <p>
        The Proof-of-Concept project has focused on the utilization of metadata,
        especially the metadata connected to the life events and on the use
        European thesauri such as Eurovoc and national keyword lists and
        classification of life events. The portal provides also access to
        references to EU directives in the national legislation. In addition,
        the PoC has produced a linked open data repository of Estonian and
        Finnish legislation, which makes it possible to use language technology
        tools in the search interfaces.
      </p>
      <div>
        <h3>
          Databases on legislation in the Nordic and Baltic countries and in the
          European Union :
        </h3>
        <ul>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="https://www.retsinformation.dk"
            >
              Denmark
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="https://www.riigiteataja.ee"
            >
              Estonia
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="https://www.finlex.fi"
            >
              Finland
            </a>
            <a
              target="_blank"
              className={classes.noBoldLink}
              href="https://data.finlex.fi"
            >
              {" "}
              (Extra source)
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="http://www.stjornartidindi.is"
            >
              Iceland
            </a>
            <a
              target="_blank"
              className={classes.noBoldLink}
              href="http://www.althingi.is/vefur/lagasafn.html"
            >
              {" "}
              (Extra source)
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="http://www.likumi.lv"
            >
              Latvia
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="https://tar.e-tar.lt"
            >
              Lithuania
            </a>
            <a
              target="_blank"
              className={classes.noBoldLink}
              href="https://e-seimas.lrs.lt/portal/documentSearch/lt"
            >
              {" "}
              (Extra source)
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="https://www.lovdata.no"
            >
              Norway
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="https://lagrummet.se"
            >
              Sweden
            </a>
            <a
              target="_blank"
              className={classes.noBoldLink}
              href="https://rkrattsbaser.gov.se/sfsr"
            >
              {" "}
              (Extra source)
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="https://op.europa.eu/en/web/forum/european-union"
            >
              Legal gazettes of the European Union and EFTA countries
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="https://n-lex.europa.eu/n-lex/"
            >
              N-Lex – gateway to national law in the EU
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="https://europa.eu/youreurope/index.htm"
            >
              Your Europe
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="https://eur-lex.europa.eu/browse/eurovoc.html"
            >
              Eurovoc thesaurus
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="https://eur-lex.europa.eu/eli-register/about.html"
            >
              European Legislation Identifier ELI
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className={classes.link}
              href="https://www.lakisampo.fi"
            >
              LawSampo - Finland
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopBarInfoPage;
