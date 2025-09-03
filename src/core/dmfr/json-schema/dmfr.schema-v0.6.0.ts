export interface Dmfr {
    feeds?:     Feed[];
    operators?: Operator[];
    [property: string]: any;
}

export interface Feed {
    authorization?: Authorization;
    /**
     * Optional text providing notes about the feed. May be shown to end-users. May be rendered
     * as Markdown by some consuming applications.
     */
    description?: string;
    /**
     * Identifier for this feed, internal to this DMFR instance. (Optionally can be a Onestop
     * ID.)
     */
    id: string;
    /**
     * Language(s) included in this feed.
     */
    languages?: string[];
    license?:   LicenseDescription;
    /**
     * An optional name to describe the feed. May be shown to end-users.
     */
    name?:      string;
    operators?: Operator[];
    /**
     * Type of data contained in this feed: GTFS, GTFS-RT, GBFS, or MDS.
     */
    spec: Spec;
    /**
     * One or more Onestop IDs for old feeds records that have since been merged into or taken
     * over by this feed record.
     */
    supersedes_ids?: string[];
    /**
     * Extended information about the feed, as well as fetch and import controls for the
     * Transitland platform.
     */
    tags?: { [key: string]: any };
    urls:  Urls;
}

export interface Authorization {
    /**
     * Website to visit to sign up for an account.
     */
    info_url?: string;
    /**
     * When type=query_param, this specifies the name of the query parameter.
     */
    param_name?: string;
    /**
     * Authorization approach: HTTP header, basic authentication, query parameter, or path
     * segment in a Transitland Extended URL.
     */
    type: Type;
    [property: string]: any;
}

/**
 * Authorization approach: HTTP header, basic authentication, query parameter, or path
 * segment in a Transitland Extended URL.
 */
export enum Type {
    BasicAuth = "basic_auth",
    Header = "header",
    PathSegment = "path_segment",
    QueryParam = "query_param",
    ReplaceURL = "replace_url",
}

export interface LicenseDescription {
    /**
     * Feed consumers must follow these instructions for how to provide attribution.
     */
    attribution_instructions?: string;
    /**
     * Feed consumers must include this particular text when using this feed.
     */
    attribution_text?: string;
    /**
     * Are feed consumers allowed to use the feed for commercial purposes?
     */
    commercial_use_allowed?: CommercialUseAllowed;
    /**
     * Are feed consumers allowed to create and share derived products from the feed?
     */
    create_derived_product?: CommercialUseAllowed;
    /**
     * Are feed consumers allowed to redistribute the feed in its entirety?
     */
    redistribution_allowed?: CommercialUseAllowed;
    /**
     * Are feed consumers allowed to keep their modifications of this feed private?
     */
    share_alike_optional?: CommercialUseAllowed;
    /**
     * SPDX identifier for a common license. See https://spdx.org/licenses/
     */
    spdx_identifier?: SpdxIdentifier;
    /**
     * URL for a custom license.
     */
    url?: string;
    /**
     * Are feed consumers allowed to use the feed contents without including attribution text in
     * their app or map?
     */
    use_without_attribution?: CommercialUseAllowed;
    [property: string]: any;
}

/**
 * Are feed consumers allowed to use the feed for commercial purposes?
 *
 * Are feed consumers allowed to create and share derived products from the feed?
 *
 * Are feed consumers allowed to redistribute the feed in its entirety?
 *
 * Are feed consumers allowed to keep their modifications of this feed private?
 *
 * Are feed consumers allowed to use the feed contents without including attribution text in
 * their app or map?
 */
export enum CommercialUseAllowed {
    No = "no",
    Unknown = "unknown",
    Yes = "yes",
}

/**
 * A language specified using an IETF language tag.
 *
 * List of SPDX short-form identifiers. To update: http
 * https://raw.githubusercontent.com/spdx/license-list-data/main/json/licenses.json | jq
 * '.licenses[] .licenseId'
 */
export enum SpdxIdentifier {
    AAL = "AAL",
    ADSL = "ADSL",
    AGPL10Only = "AGPL-1.0-only",
    AGPL10OrLater = "AGPL-1.0-or-later",
    AGPL30Only = "AGPL-3.0-only",
    AGPL30OrLater = "AGPL-3.0-or-later",
    ANTLRPDFallback = "ANTLR-PD-fallback",
    APL10 = "APL-1.0",
    ASWFDigitalAssets10 = "ASWF-Digital-Assets-1.0",
    ASWFDigitalAssets11 = "ASWF-Digital-Assets-1.1",
    Abstyles = "Abstyles",
    AdaCoreDoc = "AdaCore-doc",
    Adobe2006 = "Adobe-2006",
    AdobeGlyph = "Adobe-Glyph",
    Afl11 = "AFL-1.1",
    Afl12 = "AFL-1.2",
    Afl20 = "AFL-2.0",
    Afl21 = "AFL-2.1",
    Afl30 = "AFL-3.0",
    Afmparse = "Afmparse",
    Agpl10 = "AGPL-1.0",
    Agpl30 = "AGPL-3.0",
    Aladdin = "Aladdin",
    Amdplpa = "AMDPLPA",
    Aml = "AML",
    Ampas = "AMPAS",
    AntlrPD = "ANTLR-PD",
    Apache10 = "Apache-1.0",
    Apache11 = "Apache-1.1",
    Apache20 = "Apache-2.0",
    Apafml = "APAFML",
    AppS2P = "App-s2p",
    Apsl10 = "APSL-1.0",
    Apsl11 = "APSL-1.1",
    Apsl12 = "APSL-1.2",
    Apsl20 = "APSL-2.0",
    Arphic1999 = "Arphic-1999",
    Artistic10 = "Artistic-1.0",
    Artistic10Cl8 = "Artistic-1.0-cl8",
    Artistic10PERL = "Artistic-1.0-Perl",
    Artistic20 = "Artistic-2.0",
    BSD1Clause = "BSD-1-Clause",
    BSD2Clause = "BSD-2-Clause",
    BSD2ClauseFreeBSD = "BSD-2-Clause-FreeBSD",
    BSD2ClauseNetBSD = "BSD-2-Clause-NetBSD",
    BSD2ClausePatent = "BSD-2-Clause-Patent",
    BSD2ClauseViews = "BSD-2-Clause-Views",
    BSD3Clause = "BSD-3-Clause",
    BSD3ClauseAttribution = "BSD-3-Clause-Attribution",
    BSD3ClauseClear = "BSD-3-Clause-Clear",
    BSD3ClauseLBNL = "BSD-3-Clause-LBNL",
    BSD3ClauseModification = "BSD-3-Clause-Modification",
    BSD3ClauseNoMilitaryLicense = "BSD-3-Clause-No-Military-License",
    BSD3ClauseNoNuclearLicense = "BSD-3-Clause-No-Nuclear-License",
    BSD3ClauseNoNuclearLicense2014 = "BSD-3-Clause-No-Nuclear-License-2014",
    BSD3ClauseNoNuclearWarranty = "BSD-3-Clause-No-Nuclear-Warranty",
    BSD3ClauseOpenMPI = "BSD-3-Clause-Open-MPI",
    BSD43Reno = "BSD-4.3RENO",
    BSD43Tahoe = "BSD-4.3TAHOE",
    BSD4Clause = "BSD-4-Clause",
    BSD4ClauseShortened = "BSD-4-Clause-Shortened",
    BSD4ClauseUC = "BSD-4-Clause-UC",
    BSDAdvertisingAcknowledgement = "BSD-Advertising-Acknowledgement",
    BSDAttributionHPNDDisclaimer = "BSD-Attribution-HPND-disclaimer",
    BSDProtection = "BSD-Protection",
    BSDSourceCode = "BSD-Source-Code",
    Baekmuk = "Baekmuk",
    Bahyph = "Bahyph",
    Barr = "Barr",
    Beerware = "Beerware",
    BitTorrent10 = "BitTorrent-1.0",
    BitTorrent11 = "BitTorrent-1.1",
    BitstreamCharter = "Bitstream-Charter",
    BitstreamVera = "Bitstream-Vera",
    Blessing = "blessing",
    BlueOak100 = "BlueOak-1.0.0",
    BoehmGC = "Boehm-GC",
    Borceux = "Borceux",
    BrianGladman3Clause = "Brian-Gladman-3-Clause",
    Bsl10 = "BSL-1.0",
    Busl11 = "BUSL-1.1",
    Bzip2105 = "bzip2-1.0.5",
    Bzip2106 = "bzip2-1.0.6",
    CAL10CombinedWorkException = "CAL-1.0-Combined-Work-Exception",
    CDLAPermissive10 = "CDLA-Permissive-1.0",
    CDLAPermissive20 = "CDLA-Permissive-2.0",
    CDLASharing10 = "CDLA-Sharing-1.0",
    CMUMach = "CMU-Mach",
    CNRIJython = "CNRI-Jython",
    CNRIPython = "CNRI-Python",
    CNRIPythonGPLCompatible = "CNRI-Python-GPL-Compatible",
    CUAOpl10 = "CUA-OPL-1.0",
    CUda10 = "C-UDA-1.0",
    Cal10 = "CAL-1.0",
    Caldera = "Caldera",
    Catosl11 = "CATOSL-1.1",
    Cc010 = "CC0-1.0",
    CcBy10 = "CC-BY-1.0",
    CcBy20 = "CC-BY-2.0",
    CcBy25 = "CC-BY-2.5",
    CcBy25Au = "CC-BY-2.5-AU",
    CcBy30 = "CC-BY-3.0",
    CcBy30At = "CC-BY-3.0-AT",
    CcBy30De = "CC-BY-3.0-DE",
    CcBy30Igo = "CC-BY-3.0-IGO",
    CcBy30Nl = "CC-BY-3.0-NL",
    CcBy30Us = "CC-BY-3.0-US",
    CcBy40 = "CC-BY-4.0",
    CcByNc10 = "CC-BY-NC-1.0",
    CcByNc20 = "CC-BY-NC-2.0",
    CcByNc25 = "CC-BY-NC-2.5",
    CcByNc30 = "CC-BY-NC-3.0",
    CcByNc30De = "CC-BY-NC-3.0-DE",
    CcByNc40 = "CC-BY-NC-4.0",
    CcByNcNd10 = "CC-BY-NC-ND-1.0",
    CcByNcNd20 = "CC-BY-NC-ND-2.0",
    CcByNcNd25 = "CC-BY-NC-ND-2.5",
    CcByNcNd30 = "CC-BY-NC-ND-3.0",
    CcByNcNd30De = "CC-BY-NC-ND-3.0-DE",
    CcByNcNd30Igo = "CC-BY-NC-ND-3.0-IGO",
    CcByNcNd40 = "CC-BY-NC-ND-4.0",
    CcByNcSa10 = "CC-BY-NC-SA-1.0",
    CcByNcSa20 = "CC-BY-NC-SA-2.0",
    CcByNcSa20De = "CC-BY-NC-SA-2.0-DE",
    CcByNcSa20Fr = "CC-BY-NC-SA-2.0-FR",
    CcByNcSa20Uk = "CC-BY-NC-SA-2.0-UK",
    CcByNcSa25 = "CC-BY-NC-SA-2.5",
    CcByNcSa30 = "CC-BY-NC-SA-3.0",
    CcByNcSa30De = "CC-BY-NC-SA-3.0-DE",
    CcByNcSa30Igo = "CC-BY-NC-SA-3.0-IGO",
    CcByNcSa40 = "CC-BY-NC-SA-4.0",
    CcByNd10 = "CC-BY-ND-1.0",
    CcByNd20 = "CC-BY-ND-2.0",
    CcByNd25 = "CC-BY-ND-2.5",
    CcByNd30 = "CC-BY-ND-3.0",
    CcByNd30De = "CC-BY-ND-3.0-DE",
    CcByNd40 = "CC-BY-ND-4.0",
    CcBySa10 = "CC-BY-SA-1.0",
    CcBySa20 = "CC-BY-SA-2.0",
    CcBySa20Uk = "CC-BY-SA-2.0-UK",
    CcBySa21Jp = "CC-BY-SA-2.1-JP",
    CcBySa25 = "CC-BY-SA-2.5",
    CcBySa30 = "CC-BY-SA-3.0",
    CcBySa30At = "CC-BY-SA-3.0-AT",
    CcBySa30De = "CC-BY-SA-3.0-DE",
    CcBySa30Igo = "CC-BY-SA-3.0-IGO",
    CcBySa40 = "CC-BY-SA-4.0",
    CcPddc = "CC-PDDC",
    Cddl10 = "CDDL-1.0",
    Cddl11 = "CDDL-1.1",
    Cdl10 = "CDL-1.0",
    Cecill10 = "CECILL-1.0",
    Cecill11 = "CECILL-1.1",
    Cecill20 = "CECILL-2.0",
    Cecill21 = "CECILL-2.1",
    CecillB = "CECILL-B",
    CecillC = "CECILL-C",
    CernOhl11 = "CERN-OHL-1.1",
    CernOhl12 = "CERN-OHL-1.2",
    CernOhlP20 = "CERN-OHL-P-2.0",
    CernOhlS20 = "CERN-OHL-S-2.0",
    CernOhlW20 = "CERN-OHL-W-2.0",
    Cfitsio = "CFITSIO",
    Checkmk = "checkmk",
    ClArtistic = "ClArtistic",
    Clips = "Clips",
    Coil10 = "COIL-1.0",
    CommunitySpec10 = "Community-Spec-1.0",
    Condor11 = "Condor-1.1",
    CopyleftNext030 = "copyleft-next-0.3.0",
    CopyleftNext031 = "copyleft-next-0.3.1",
    CornellLosslessJPEG = "Cornell-Lossless-JPEG",
    Cpal10 = "CPAL-1.0",
    Cpl10 = "CPL-1.0",
    Cpol102 = "CPOL-1.02",
    Crossword = "Crossword",
    CrystalStacker = "CrystalStacker",
    Cube = "Cube",
    Curl = "curl",
    DFsl10 = "D-FSL-1.0",
    DLDeBy20 = "DL-DE-BY-2.0",
    Diffmark = "diffmark",
    Doc = "DOC",
    Dotseqn = "Dotseqn",
    Drl10 = "DRL-1.0",
    Dsdp = "DSDP",
    Dtoa = "dtoa",
    Dvipdfm = "dvipdfm",
    ECos20 = "eCos-2.0",
    EGenix = "eGenix",
    EUDatagrid = "EUDatagrid",
    Ecl10 = "ECL-1.0",
    Ecl20 = "ECL-2.0",
    Efl10 = "EFL-1.0",
    Efl20 = "EFL-2.0",
    Elastic20 = "Elastic-2.0",
    Entessa = "Entessa",
    Epics = "EPICS",
    Epl10 = "EPL-1.0",
    Epl20 = "EPL-2.0",
    ErlPL11 = "ErlPL-1.1",
    Etalab20 = "etalab-2.0",
    Eupl10 = "EUPL-1.0",
    Eupl11 = "EUPL-1.1",
    Eupl12 = "EUPL-1.2",
    Eurosym = "Eurosym",
    Fair = "Fair",
    FdkAAC = "FDK-AAC",
    Frameworx10 = "Frameworx-1.0",
    FreeBSDDOC = "FreeBSD-DOC",
    FreeImage = "FreeImage",
    Fsfap = "FSFAP",
    Fsful = "FSFUL",
    Fsfullr = "FSFULLR",
    Fsfullrwd = "FSFULLRWD",
    Ftl = "FTL",
    GFDL11 = "GFDL-1.1",
    GFDL11InvariantsOnly = "GFDL-1.1-invariants-only",
    GFDL11InvariantsOrLater = "GFDL-1.1-invariants-or-later",
    GFDL11NoInvariantsOnly = "GFDL-1.1-no-invariants-only",
    GFDL11NoInvariantsOrLater = "GFDL-1.1-no-invariants-or-later",
    GFDL11Only = "GFDL-1.1-only",
    GFDL11OrLater = "GFDL-1.1-or-later",
    GFDL12 = "GFDL-1.2",
    GFDL12InvariantsOnly = "GFDL-1.2-invariants-only",
    GFDL12InvariantsOrLater = "GFDL-1.2-invariants-or-later",
    GFDL12NoInvariantsOnly = "GFDL-1.2-no-invariants-only",
    GFDL12NoInvariantsOrLater = "GFDL-1.2-no-invariants-or-later",
    GFDL12Only = "GFDL-1.2-only",
    GFDL12OrLater = "GFDL-1.2-or-later",
    GFDL13 = "GFDL-1.3",
    GFDL13InvariantsOnly = "GFDL-1.3-invariants-only",
    GFDL13InvariantsOrLater = "GFDL-1.3-invariants-or-later",
    GFDL13NoInvariantsOnly = "GFDL-1.3-no-invariants-only",
    GFDL13NoInvariantsOrLater = "GFDL-1.3-no-invariants-or-later",
    GFDL13Only = "GFDL-1.3-only",
    GFDL13OrLater = "GFDL-1.3-or-later",
    GPL10 = "GPL-1.0",
    GPL10Only = "GPL-1.0-only",
    GPL10OrLater = "GPL-1.0-or-later",
    GPL20 = "GPL-2.0",
    GPL20Only = "GPL-2.0-only",
    GPL20OrLater = "GPL-2.0-or-later",
    GPL20WithAutoconfException = "GPL-2.0-with-autoconf-exception",
    GPL20WithBisonException = "GPL-2.0-with-bison-exception",
    GPL20WithClasspathException = "GPL-2.0-with-classpath-exception",
    GPL20WithFontException = "GPL-2.0-with-font-exception",
    GPL20WithGCCException = "GPL-2.0-with-GCC-exception",
    GPL30 = "GPL-3.0",
    GPL30Only = "GPL-3.0-only",
    GPL30OrLater = "GPL-3.0-or-later",
    GPL30WithAutoconfException = "GPL-3.0-with-autoconf-exception",
    GPL30WithGCCException = "GPL-3.0-with-GCC-exception",
    GSOAP13B = "gSOAP-1.3b",
    Gd = "GD",
    Giftware = "Giftware",
    Gl2PS = "GL2PS",
    Glide = "Glide",
    Glulxe = "Glulxe",
    Glwtpl = "GLWTPL",
    Gnuplot = "gnuplot",
    GraphicsGems = "Graphics-Gems",
    HP1986 = "HP-1986",
    HPNDExportUS = "HPND-export-US",
    HPNDMarkusKuhn = "HPND-Markus-Kuhn",
    HPNDSellVariant = "HPND-sell-variant",
    HPNDSellVariantMITDisclaimer = "HPND-sell-variant-MIT-disclaimer",
    HaskellReport = "HaskellReport",
    Hippocratic21 = "Hippocratic-2.1",
    Hpnd = "HPND",
    Htmltidy = "HTMLTIDY",
    IBMPibs = "IBM-pibs",
    IECCodeComponentsEULA = "IEC-Code-Components-EULA",
    IJGShort = "IJG-short",
    IMatix = "iMatix",
    IPL10 = "IPL-1.0",
    ISC = "ISC",
    Icu = "ICU",
    Ijg = "IJG",
    ImageMagick = "ImageMagick",
    Imlib2 = "Imlib2",
    InfoZIP = "Info-ZIP",
    InnerNet20 = "Inner-Net-2.0",
    Intel = "Intel",
    IntelACPI = "Intel-ACPI",
    Interbase10 = "Interbase-1.0",
    Ipa = "IPA",
    JPLImage = "JPL-image",
    JSON = "JSON",
    Jam = "Jam",
    JasPer20 = "JasPer-2.0",
    Jpnic = "JPNIC",
    Kazlib = "Kazlib",
    KnuthCTAN = "Knuth-CTAN",
    LGPL20 = "LGPL-2.0",
    LGPL20Only = "LGPL-2.0-only",
    LGPL20OrLater = "LGPL-2.0-or-later",
    LGPL21 = "LGPL-2.1",
    LGPL21Only = "LGPL-2.1-only",
    LGPL21OrLater = "LGPL-2.1-or-later",
    LGPL30 = "LGPL-3.0",
    LGPL30Only = "LGPL-3.0-only",
    LGPL30OrLater = "LGPL-3.0-or-later",
    LPPL13A = "LPPL-1.3a",
    LPPL13C = "LPPL-1.3c",
    LZMASDK911To920 = "LZMA-SDK-9.11-to-9.20",
    Lal12 = "LAL-1.2",
    Lal13 = "LAL-1.3",
    Latex2E = "Latex2e",
    Latex2ETranslatedNotice = "Latex2e-translated-notice",
    Leptonica = "Leptonica",
    Lgpllr = "LGPLLR",
    LiLiQP11 = "LiLiQ-P-1.1",
    LiLiQR11 = "LiLiQ-R-1.1",
    LiLiQRplus11 = "LiLiQ-Rplus-1.1",
    Libpng = "Libpng",
    Libpng20 = "libpng-2.0",
    Libselinux10 = "libselinux-1.0",
    Libtiff = "libtiff",
    LibutilDavidNugent = "libutil-David-Nugent",
    LinuxManPages1Para = "Linux-man-pages-1-para",
    LinuxManPagesCopyleft = "Linux-man-pages-copyleft",
    LinuxManPagesCopyleft2Para = "Linux-man-pages-copyleft-2-para",
    LinuxManPagesCopyleftVar = "Linux-man-pages-copyleft-var",
    LinuxOpenIB = "Linux-OpenIB",
    Loop = "LOOP",
    Lpl10 = "LPL-1.0",
    Lpl102 = "LPL-1.02",
    Lppl10 = "LPPL-1.0",
    Lppl11 = "LPPL-1.1",
    Lppl12 = "LPPL-1.2",
    LzmaSDK922 = "LZMA-SDK-9.22",
    MIT = "MIT",
    MIT0 = "MIT-0",
    MITAdvertising = "MIT-advertising",
    MITCmu = "MIT-CMU",
    MITEnna = "MIT-enna",
    MITFeh = "MIT-feh",
    MITFestival = "MIT-Festival",
    MITModernVariant = "MIT-Modern-Variant",
    MITOpenGroup = "MIT-open-group",
    MITWu = "MIT-Wu",
    MPL10 = "MPL-1.0",
    MPL11 = "MPL-1.1",
    MPL20 = "MPL-2.0",
    MPL20NoCopyleftException = "MPL-2.0-no-copyleft-exception",
    MSLpl = "MS-LPL",
    MSPl = "MS-PL",
    MSRl = "MS-RL",
    MakeIndex = "MakeIndex",
    MartinBirgmeier = "Martin-Birgmeier",
    Metamail = "metamail",
    Minpack = "Minpack",
    MirOS = "MirOS",
    Mitnfa = "MITNFA",
    Motosoto = "Motosoto",
    MpiPermissive = "mpi-permissive",
    Mpich2 = "mpich2",
    Mplus = "mplus",
    Mtll = "MTLL",
    MulanPSL10 = "MulanPSL-1.0",
    MulanPSL20 = "MulanPSL-2.0",
    Multics = "Multics",
    Mup = "Mup",
    NCSA = "NCSA",
    NISTPD = "NIST-PD",
    NISTPDFallback = "NIST-PD-fallback",
    NISTSoftware = "NIST-Software",
    NPL10 = "NPL-1.0",
    NPL11 = "NPL-1.1",
    NTP = "NTP",
    NTP0 = "NTP-0",
    Naist2003 = "NAIST-2003",
    Nasa13 = "NASA-1.3",
    Naumen = "Naumen",
    Nbpl10 = "NBPL-1.0",
    NcglUk20 = "NCGL-UK-2.0",
    NetCDF = "NetCDF",
    NetSNMP = "Net-SNMP",
    Newsletr = "Newsletr",
    Ngpl = "NGPL",
    Nicta10 = "NICTA-1.0",
    Nlod10 = "NLOD-1.0",
    Nlod20 = "NLOD-2.0",
    Nlpl = "NLPL",
    Nokia = "Nokia",
    Nosl = "NOSL",
    Noweb = "Noweb",
    Nposl30 = "NPOSL-3.0",
    Nrl = "NRL",
    Nunit = "Nunit",
    ODBL10 = "ODbL-1.0",
    ODCBy10 = "ODC-By-1.0",
    OFL10NoRFN = "OFL-1.0-no-RFN",
    OFL11NoRFN = "OFL-1.1-no-RFN",
    OGDLTaiwan10 = "OGDL-Taiwan-1.0",
    OGLCanada20 = "OGL-Canada-2.0",
    OUda10 = "O-UDA-1.0",
    OcctPl = "OCCT-PL",
    Oclc20 = "OCLC-2.0",
    Offis = "OFFIS",
    Ofl10 = "OFL-1.0",
    Ofl10Rfn = "OFL-1.0-RFN",
    Ofl11 = "OFL-1.1",
    Ofl11Rfn = "OFL-1.1-RFN",
    Ogc10 = "OGC-1.0",
    OglUk10 = "OGL-UK-1.0",
    OglUk20 = "OGL-UK-2.0",
    OglUk30 = "OGL-UK-3.0",
    Ogtsl = "OGTSL",
    Oldap11 = "OLDAP-1.1",
    Oldap12 = "OLDAP-1.2",
    Oldap13 = "OLDAP-1.3",
    Oldap14 = "OLDAP-1.4",
    Oldap20 = "OLDAP-2.0",
    Oldap201 = "OLDAP-2.0.1",
    Oldap21 = "OLDAP-2.1",
    Oldap22 = "OLDAP-2.2",
    Oldap221 = "OLDAP-2.2.1",
    Oldap222 = "OLDAP-2.2.2",
    Oldap23 = "OLDAP-2.3",
    Oldap24 = "OLDAP-2.4",
    Oldap25 = "OLDAP-2.5",
    Oldap26 = "OLDAP-2.6",
    Oldap27 = "OLDAP-2.7",
    Oldap28 = "OLDAP-2.8",
    Olfl13 = "OLFL-1.3",
    Oml = "OML",
    OpenPBS23 = "OpenPBS-2.3",
    OpenSSL = "OpenSSL",
    Opl10 = "OPL-1.0",
    OplUk30 = "OPL-UK-3.0",
    Opubl10 = "OPUBL-1.0",
    OsetPl21 = "OSET-PL-2.1",
    Osl10 = "OSL-1.0",
    Osl11 = "OSL-1.1",
    Osl20 = "OSL-2.0",
    Osl21 = "OSL-2.1",
    Osl30 = "OSL-3.0",
    PHP30 = "PHP-3.0",
    PHP301 = "PHP-3.01",
    Parity600 = "Parity-6.0.0",
    Parity700 = "Parity-7.0.0",
    Pddl10 = "PDDL-1.0",
    Plexus = "Plexus",
    PolyFormNoncommercial100 = "PolyForm-Noncommercial-1.0.0",
    PolyFormSmallBusiness100 = "PolyForm-Small-Business-1.0.0",
    PostgreSQL = "PostgreSQL",
    Psf20 = "PSF-2.0",
    Psfrag = "psfrag",
    Psutils = "psutils",
    Python20 = "Python-2.0",
    Python201 = "Python-2.0.1",
    Qhull = "Qhull",
    Qpl10 = "QPL-1.0",
    Qpl10Inria2004 = "QPL-1.0-INRIA-2004",
    RHeCos11 = "RHeCos-1.1",
    RSAMd = "RSA-MD",
    Rdisc = "Rdisc",
    Rpl11 = "RPL-1.1",
    Rpl15 = "RPL-1.5",
    Rpsl10 = "RPSL-1.0",
    Rscpl = "RSCPL",
    Ruby = "Ruby",
    SAXPD = "SAX-PD",
    SGIB10 = "SGI-B-1.0",
    SGIB11 = "SGI-B-1.1",
    SGIB20 = "SGI-B-2.0",
    SSHOpenSSH = "SSH-OpenSSH",
    SSHShort = "SSH-short",
    Saxpath = "Saxpath",
    Scea = "SCEA",
    SchemeReport = "SchemeReport",
    Sendmail = "Sendmail",
    Sendmail823 = "Sendmail-8.23",
    Sgp4 = "SGP4",
    Shl05 = "SHL-0.5",
    Shl051 = "SHL-0.51",
    SimPL20 = "SimPL-2.0",
    Sissl = "SISSL",
    Sissl12 = "SISSL-1.2",
    Sleepycat = "Sleepycat",
    Smlnj = "SMLNJ",
    Smppl = "SMPPL",
    Snia = "SNIA",
    Snprintf = "snprintf",
    SpdxIdentifierGPL10 = "GPL-1.0+",
    SpdxIdentifierGPL20 = "GPL-2.0+",
    SpdxIdentifierGPL30 = "GPL-3.0+",
    SpdxIdentifierLGPL20 = "LGPL-2.0+",
    SpdxIdentifierLGPL21 = "LGPL-2.1+",
    SpdxIdentifierLGPL30 = "LGPL-3.0+",
    Spencer86 = "Spencer-86",
    Spencer94 = "Spencer-94",
    Spencer99 = "Spencer-99",
    Spl10 = "SPL-1.0",
    Sspl10 = "SSPL-1.0",
    StandardMLNJ = "StandardML-NJ",
    SugarCRM113 = "SugarCRM-1.1.3",
    SunPro = "SunPro",
    Swl = "SWL",
    Symlinks = "Symlinks",
    TCPWrappers = "TCP-wrappers",
    TMate = "TMate",
    TUBerlin10 = "TU-Berlin-1.0",
    TUBerlin20 = "TU-Berlin-2.0",
    TaprOhl10 = "TAPR-OHL-1.0",
    Tcl = "TCL",
    TermReadKey = "TermReadKey",
    The0BSD = "0BSD",
    Torque11 = "TORQUE-1.1",
    Tosl = "TOSL",
    Tpdl = "TPDL",
    Tpl10 = "TPL-1.0",
    Ttwl = "TTWL",
    Ucar = "UCAR",
    Ucl10 = "UCL-1.0",
    UnicodeDFS2015 = "Unicode-DFS-2015",
    UnicodeDFS2016 = "Unicode-DFS-2016",
    UnicodeTOU = "Unicode-TOU",
    UnixCrypt = "UnixCrypt",
    Unlicense = "Unlicense",
    Upl10 = "UPL-1.0",
    Vim = "Vim",
    Vostrom = "VOSTROM",
    Vsl10 = "VSL-1.0",
    W3C = "W3C",
    W3C19980720 = "W3C-19980720",
    W3C20150513 = "W3C-20150513",
    W3M = "w3m",
    Watcom10 = "Watcom-1.0",
    WidgetWorkshop = "Widget-Workshop",
    Wsuipa = "Wsuipa",
    Wtfpl = "WTFPL",
    WxWindows = "wxWindows",
    X11 = "X11",
    X11DistributeModificationsVariant = "X11-distribute-modifications-variant",
    XFree8611 = "XFree86-1.1",
    XSkat = "XSkat",
    Xdebug103 = "Xdebug-1.03",
    Xerox = "Xerox",
    Xfig = "Xfig",
    Xinetd = "xinetd",
    Xlock = "xlock",
    Xnet = "Xnet",
    Xpp = "xpp",
    Ypl10 = "YPL-1.0",
    Ypl11 = "YPL-1.1",
    ZPL11 = "ZPL-1.1",
    ZPL20 = "ZPL-2.0",
    ZPL21 = "ZPL-2.1",
    Zed = "Zed",
    Zend20 = "Zend-2.0",
    Zimbra13 = "Zimbra-1.3",
    Zimbra14 = "Zimbra-1.4",
    Zlib = "Zlib",
    ZlibAcknowledgement = "zlib-acknowledgement",
}

export interface Operator {
    /**
     * Define associations between an operator and one or more feeds. If this operator is
     * defined underneath a feed, it is not necessary to include a feed_onestop_id. In all
     * cases, it is only necessary to specify a gtfs_agency_id when a feed includes more than
     * one agency; Transitland will auto-detect the agency_id if the feed includes only one feed.
     */
    associated_feeds?: AssociatedFeed[];
    /**
     * Full name of the operator. If there is an abbreviation or acronym for the operator, also
     * define a short_name.
     */
    name: string;
    /**
     * The globally unique Onestop ID for this operator.
     */
    onestop_id: string;
    /**
     * Abbreviation, acronym, or secondary name of the operator.
     */
    short_name?: string;
    /**
     * One or more Onestop IDs for old operator records that have since been merged into or
     * taken over by this operator record.
     */
    supersedes_ids?: string[];
    /**
     * Extended information about the operator, including identifiers for this operator in other
     * datasets.
     */
    tags?: { [key: string]: any };
    /**
     * URL for the operator's public website.
     */
    website?: string;
}

export interface AssociatedFeed {
    /**
     * The Onestop ID of the feed that this operator is associated with. Not required when the
     * operator definition is nested underneath a feed.
     */
    feed_onestop_id?: string;
    /**
     * ID from the agency.txt file in the GTFS feed that corresponds to this operator. Only
     * required when the feed includes more than one agency.
     */
    gtfs_agency_id?: string;
    [property: string]: any;
}

/**
 * Type of data contained in this feed: GTFS, GTFS-RT, GBFS, or MDS.
 */
export enum Spec {
    Gbfs = "gbfs",
    Gtfs = "gtfs",
    GtfsRt = "gtfs-rt",
    Mds = "mds",
}

export interface Urls {
    /**
     * Auto-discovery file in JSON format that links to all of the other GBFS files published by
     * the system.
     */
    gbfs_auto_discovery?: string;
    /**
     * MDS provider API endpoints are intended to be implemented by mobility providers and
     * consumed by regulatory agencies.
     */
    mds_provider?: string;
    /**
     * URL for GTFS Realtime Alert messages.
     */
    realtime_alerts?: string;
    /**
     * URL for GTFS Realtime TripUpdate messages.
     */
    realtime_trip_updates?: string;
    /**
     * URL for GTFS Realtime VehiclePosition messages.
     */
    realtime_vehicle_positions?: string;
    /**
     * URL (in Transitland Extended URL format) for the static feed that represents today's
     * service. (Has the same meaning as url.)
     */
    static_current?:      string;
    static_historic?:     string[];
    static_hypothetical?: string[];
    static_planned?:      string[];
    [property: string]: any;
}
