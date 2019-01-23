import React, { Component } from 'react';

// Components
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';

// Redux
import { connect } from 'react-redux';
import actions from '../../actions';
import { dxAlert as dxAlertAction } from '../../../actions';

// constants
import sizes from '../../../styles/sizes';
import colors from '../../../styles/colors';

import { findWithAttr } from '../../../helpers';

class EditLanguageContainer extends Component {
  state = {
    // Panel
    expanded: null
  };

  componentDidMount() {
    this.props.languageViewRequest(this.props.languageGUID);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isCompleted && nextProps.isCompleted) {
      const { navArr } = this.props;
      let index = findWithAttr(navArr, 'type', 'LANGUAGES');
      this.props.history.push(`/dashboard/${index}`);
    }

    if (!this.props.isLanguageFetched && nextProps.isLanguageFetched) {
      this.setState({
        LanguageName: nextProps.language.Language,
        LanguageCode: nextProps.language.LanguageCode,

        EmailLabel: nextProps.language.LoginScreen[0].Content,
        PasswordLabel: nextProps.language.LoginScreen[1].Content,
        LoginLabel: nextProps.language.LoginScreen[2].Content,
        OnboardPageMessage1Label: nextProps.language.LoginScreen[3].Content,
        OnboardPageMessage2Label: nextProps.language.LoginScreen[4].Content,
        OnboardPageMessage3Label: nextProps.language.LoginScreen[5].Content,
        LoginContinueLabel: nextProps.language.LoginScreen[6].Content,
        CustomizeMyJourneyLabel: nextProps.language.LoginScreen[7].Content,
        WelcomeToLabel: nextProps.language.LoginScreen[8].Content,
        PoweredByLabel: nextProps.language.LoginScreen[9].Content,
        AvailableChannelsLabel: nextProps.language.LoginScreen[10].Content,
        InterestedChannelsLabel: nextProps.language.LoginScreen[11].Content,
        LoginTermsAndConditionLabel: nextProps.language.LoginScreen[12].Content,
        LoginPolicyLabel: nextProps.language.LoginScreen[13].Content,
        TermsCheckboxLabel: nextProps.language.LoginScreen[14].Content,
        CustomizePageMessageLabel: nextProps.language.LoginScreen[15].Content,
        LoginEmptyChannelLabel: nextProps.language.LoginScreen[16].Content,

        HomeLabel: nextProps.language.HomeScreen[0].Content,
        DiscoverLabel: nextProps.language.HomeScreen[1].Content,
        HomePageContinueReadingLabel: nextProps.language.HomeScreen[2].Content,
        SeeAllReading: nextProps.language.HomeScreen[3].Content,
        FeaturedLabel: nextProps.language.HomeScreen[4].Content,
        MostPopularLabel: nextProps.language.HomeScreen[5].Content,
        NewReleaseLabel: nextProps.language.HomeScreen[6].Content,
        TrendingLabel: nextProps.language.HomeScreen[7].Content,
        LoginSearchLabel: nextProps.language.HomeScreen[8].Content,
        LoginEmptyLabel: nextProps.language.HomeScreen[9].Content,
        LoginLoginLabel: nextProps.language.HomeScreen[10].Content,
        EmptyDownloadMessage2Label: nextProps.language.HomeScreen[11].Content,
        DashboardLabel: nextProps.language.HomeScreen[12].Content,
        PageLoadingMessage1Label: nextProps.language.HomeScreen[13].Content,
        PageLoadingMessage2Label: nextProps.language.HomeScreen[14].Content,
        SignUpLabel: nextProps.language.HomeScreen[15].Content,

        ExploreLabel: nextProps.language.ExploreScreen[0].Content,
        ReadMoreLabel: nextProps.language.ExploreScreen[1].Content,
        ShowLessLabel: nextProps.language.ExploreScreen[2].Content,
        NoDescLabel: nextProps.language.ExploreScreen[3].Content,
        PassCodeBarLabel: nextProps.language.ExploreScreen[4].Content,
        PassCodeTitleLabel: nextProps.language.ExploreScreen[5].Content,
        PassCodeDescLabel: nextProps.language.ExploreScreen[6].Content,
        PassCodeLabel: nextProps.language.ExploreScreen[7].Content,
        PassCodeSubmitLabel: nextProps.language.ExploreScreen[8].Content,
        ExploreSearchLabel: nextProps.language.ExploreScreen[9].Content,
        ExploreEmptyLabel: nextProps.language.ExploreScreen[10].Content,
        ExploreAllLabel: nextProps.language.ExploreScreen[11].Content,
        ExplorePublicLabel: nextProps.language.ExploreScreen[12].Content,
        ExplorePassCodeLabel: nextProps.language.ExploreScreen[13].Content,
        ExploreJoinLabel: nextProps.language.ExploreScreen[14].Content,

        FeedPostLabel: nextProps.language.FeedScreen[0].Content,
        FeedPageSearchLabel: nextProps.language.FeedScreen[1].Content,
        FeedPageEmptyLabel: nextProps.language.FeedScreen[2].Content,
        FeedFeedLabel: nextProps.language.FeedScreen[3].Content,

        BookmarksLabel: nextProps.language.BookmarkScreen[0].Content,
        BookmarkPageSearchLabel: nextProps.language.BookmarkScreen[1].Content,
        BookmarkPageEmptyLabel: nextProps.language.BookmarkScreen[2].Content,

        DownloadsLabel: nextProps.language.DownloadScreen[0].Content,
        DownloadPageSearchLabel: nextProps.language.DownloadScreen[1].Content,
        DownloadPageEmptyLabel: nextProps.language.DownloadScreen[2].Content,

        // Section Page
        ViewCardLabel: nextProps.language.SectionScreen[0].Content,
        StartFromBeginningLabel: nextProps.language.SectionScreen[1].Content,
        ScrollLabel: nextProps.language.SectionScreen[2].Content,
        SectionPageContinueReadingLabel:
          nextProps.language.SectionScreen[3].Content,
        CompletedLabel: nextProps.language.SectionScreen[4].Content,
        ContinueToFeedbackLabel: nextProps.language.SectionScreen[5].Content,
        NextLabel: nextProps.language.SectionScreen[6].Content,
        PreviousLabel: nextProps.language.SectionScreen[7].Content,

        // Feedback Page
        FeedbackLabel: nextProps.language.FeedbackScreen[0].Content,
        YesLabel: nextProps.language.FeedbackScreen[1].Content,
        NoLabel: nextProps.language.FeedbackScreen[2].Content,
        BackToHomeLabel: nextProps.language.FeedbackScreen[3].Content,
        ThankYouLabel: nextProps.language.FeedbackScreen[4].Content,
        QuestionOneLabel: nextProps.language.FeedbackScreen[5].Content,
        QuestionTwoLabel: nextProps.language.FeedbackScreen[6].Content,
        QuestionThreeLabel: nextProps.language.FeedbackScreen[7].Content,
        QuestionFourLabel: nextProps.language.FeedbackScreen[8].Content,
        InputLabel: nextProps.language.FeedbackScreen[9].Content,

        // Language
        LanguageLabel: nextProps.language.LanguageScreen[0].Content,

        // Loader
        LoaderLabel: nextProps.language.Loader[0].Content,
        LoaderDescLabel: nextProps.language.Loader[1].Content,

        // DxCard
        DxCardPostLabel: nextProps.language.DxCard[0].Content,
        InternetLabel: nextProps.language.DxCard[1].Content,

        // DxModal
        ContinueLabel: nextProps.language.DxModal[0].Content,
        GoToHomepageLabel: nextProps.language.DxModal[1].Content,
        GoBackLabel: nextProps.language.DxModal[2].Content,

        // SideBar
        SidebarDownloadLabel: nextProps.language.SideBar[0].Content,
        SidebarLanguageLabel: nextProps.language.SideBar[1].Content,
        SidebarLogoutLabel: nextProps.language.SideBar[2].Content,

        // Message
        MessageInternetLabel: nextProps.language.Message[0].Content,
        LoginEmailErrorLabel: nextProps.language.Message[1].Content,
        LoginPasswordErrorLabel: nextProps.language.Message[2].Content,
        LoginErrorLabel: nextProps.language.Message[3].Content,
        PassCodeRequiredErrorLabel: nextProps.language.Message[4].Content,
        PassCodeErrorLabel: nextProps.language.Message[5].Content,
        PassCodeDuplicateErrorLabel: nextProps.language.Message[6].Content,
        PassCodeSuccessLabel: nextProps.language.Message[7].Content,
        DownloadDeleteSuccessLabel: nextProps.language.Message[8].Content,
        BookmarkAddSuccessLabel: nextProps.language.Message[9].Content,
        BookmarkDeleteSuccessLabel: nextProps.language.Message[10].Content,
        TermsAndConditionLabel: nextProps.language.Message[11].Content,
        RequireInternetAccessLabel: nextProps.language.Message[12].Content,
        VideoNotAvailableLabel: nextProps.language.Message[13].Content,
        SearchLabel: nextProps.language.Message[14].Content,

        // FirstInstall
        UpdateApplicationLabel: nextProps.language.FirstInstall[0].Content,
        UpdateApplicationMessageLabel:
          nextProps.language.FirstInstall[1].Content,
        SelectLanguageLabel: nextProps.language.FirstInstall[2].Content
      });
    }
  }

  handlePanelChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleLabelSubmit = () => {
    const {
      LanguageName,
      LanguageCode,

      LoginLabel,
      EmailLabel,
      PasswordLabel,
      OnboardPageMessage1Label,
      OnboardPageMessage2Label,
      OnboardPageMessage3Label,
      LoginContinueLabel,
      CustomizeMyJourneyLabel,
      WelcomeToLabel,
      PoweredByLabel,
      AvailableChannelsLabel,
      InterestedChannelsLabel,
      LoginTermsAndConditionLabel,
      LoginPolicyLabel,
      TermsCheckboxLabel,
      CustomizePageMessageLabel,
      LoginEmptyChannelLabel,

      HomeLabel,
      DiscoverLabel,
      HomePageContinueReadingLabel,
      SeeAllReading,
      FeaturedLabel,
      MostPopularLabel,
      NewReleaseLabel,
      TrendingLabel,
      LoginSearchLabel,
      LoginEmptyLabel,
      LoginLoginLabel,
      EmptyDownloadMessage2Label,
      DashboardLabel,
      PageLoadingMessage1Label,
      PageLoadingMessage2Label,
      SignUpLabel,

      ExploreLabel,
      ReadMoreLabel,
      ShowLessLabel,
      NoDescLabel,
      PassCodeBarLabel,
      PassCodeTitleLabel,
      PassCodeDescLabel,
      PassCodeLabel,
      PassCodeSubmitLabel,
      ExploreEmptyLabel,
      ExploreSearchLabel,
      ExploreAllLabel,
      ExplorePublicLabel,
      ExplorePassCodeLabel,
      ExploreJoinLabel,

      FeedPostLabel,
      FeedPageSearchLabel,
      FeedPageEmptyLabel,
      FeedFeedLabel,

      BookmarksLabel,
      BookmarkPageSearchLabel,
      BookmarkPageEmptyLabel,

      DownloadsLabel,
      DownloadPageSearchLabel,
      DownloadPageEmptyLabel,

      // Section Page
      ViewCardLabel,
      StartFromBeginningLabel,
      ScrollLabel,
      SectionPageContinueReadingLabel,
      CompletedLabel,
      ContinueToFeedbackLabel,
      NextLabel,
      PreviousLabel,

      // Feedback Page
      FeedbackLabel,
      YesLabel,
      NoLabel,
      BackToHomeLabel,
      ThankYouLabel,
      QuestionOneLabel,
      QuestionTwoLabel,
      QuestionThreeLabel,
      QuestionFourLabel,
      InputLabel,

      // Language
      LanguageLabel,

      // Loader
      LoaderLabel,
      LoaderDescLabel,

      // DxCard
      DxCardPostLabel,
      InternetLabel,

      // DxModal
      ContinueLabel,
      GoToHomepageLabel,
      GoBackLabel,

      // SideBar
      SidebarDownloadLabel,
      SidebarLanguageLabel,
      SidebarLogoutLabel,

      // Message
      MessageInternetLabel,
      LoginEmailErrorLabel,
      LoginPasswordErrorLabel,
      LoginErrorLabel,
      PassCodeRequiredErrorLabel,
      PassCodeErrorLabel,
      PassCodeDuplicateErrorLabel,
      PassCodeSuccessLabel,
      DownloadDeleteSuccessLabel,
      BookmarkAddSuccessLabel,
      BookmarkDeleteSuccessLabel,
      TermsAndConditionLabel,
      RequireInternetAccessLabel,
      VideoNotAvailableLabel,
      SearchLabel,

      // FirstInstall
      UpdateApplicationLabel,
      UpdateApplicationMessageLabel,
      SelectLanguageLabel
    } = this.state;

    if (
      !LanguageName ||
      !LanguageCode ||
      !LoginLabel ||
      !EmailLabel ||
      !PasswordLabel ||
      !OnboardPageMessage1Label ||
      !OnboardPageMessage2Label ||
      !OnboardPageMessage3Label ||
      !LoginContinueLabel ||
      !CustomizeMyJourneyLabel ||
      !WelcomeToLabel ||
      !PoweredByLabel ||
      !AvailableChannelsLabel ||
      !InterestedChannelsLabel ||
      !LoginTermsAndConditionLabel ||
      !LoginPolicyLabel ||
      !TermsCheckboxLabel ||
      !CustomizePageMessageLabel ||
      !LoginEmptyChannelLabel ||
      !HomeLabel ||
      !DiscoverLabel ||
      !HomePageContinueReadingLabel ||
      !SeeAllReading ||
      !FeaturedLabel ||
      !MostPopularLabel ||
      !NewReleaseLabel ||
      !TrendingLabel ||
      !LoginSearchLabel ||
      !LoginEmptyLabel ||
      !LoginLoginLabel ||
      !EmptyDownloadMessage2Label ||
      !DashboardLabel ||
      !PageLoadingMessage1Label ||
      !PageLoadingMessage2Label ||
      !SignUpLabel ||
      !ExploreLabel ||
      !ReadMoreLabel ||
      !ShowLessLabel ||
      !NoDescLabel ||
      !PassCodeBarLabel ||
      !PassCodeTitleLabel ||
      !PassCodeDescLabel ||
      !PassCodeLabel ||
      !PassCodeSubmitLabel ||
      !ExploreEmptyLabel ||
      !ExploreSearchLabel ||
      !ExploreAllLabel ||
      !ExplorePublicLabel ||
      !ExplorePassCodeLabel ||
      !ExploreJoinLabel ||
      !FeedPostLabel ||
      !FeedPageSearchLabel ||
      !FeedPageEmptyLabel ||
      !FeedFeedLabel ||
      !BookmarksLabel ||
      !BookmarkPageSearchLabel ||
      !BookmarkPageEmptyLabel ||
      !DownloadsLabel ||
      !DownloadPageSearchLabel ||
      !DownloadPageEmptyLabel ||
      !ViewCardLabel ||
      !StartFromBeginningLabel ||
      !ScrollLabel ||
      !SectionPageContinueReadingLabel ||
      !CompletedLabel ||
      !ContinueToFeedbackLabel ||
      !NextLabel ||
      !PreviousLabel ||
      !FeedbackLabel ||
      !YesLabel ||
      !NoLabel ||
      !BackToHomeLabel ||
      !ThankYouLabel ||
      !QuestionOneLabel ||
      !QuestionTwoLabel ||
      !QuestionThreeLabel ||
      !QuestionFourLabel ||
      !InputLabel ||
      !LanguageLabel ||
      !LoaderLabel ||
      !LoaderDescLabel ||
      !DxCardPostLabel ||
      !InternetLabel ||
      !ContinueLabel ||
      !GoToHomepageLabel ||
      !GoBackLabel ||
      !SidebarDownloadLabel ||
      !SidebarLanguageLabel ||
      !SidebarLogoutLabel ||
      !MessageInternetLabel ||
      !LoginEmailErrorLabel ||
      !LoginPasswordErrorLabel ||
      !LoginErrorLabel ||
      !PassCodeRequiredErrorLabel ||
      !PassCodeErrorLabel ||
      !PassCodeDuplicateErrorLabel ||
      !PassCodeSuccessLabel ||
      !DownloadDeleteSuccessLabel ||
      !BookmarkAddSuccessLabel ||
      !BookmarkDeleteSuccessLabel ||
      !TermsAndConditionLabel ||
      !RequireInternetAccessLabel ||
      !VideoNotAvailableLabel ||
      !SearchLabel ||
      !UpdateApplicationLabel ||
      !UpdateApplicationMessageLabel ||
      !SelectLanguageLabel
    ) {
      this.props.dxAlertAction(true, true, 'Value is empty');
      return;
    }

    const { LanguageGUID } = this.props.language;

    const data = {
      LanguageGUID,
      Language: LanguageName,
      LanguageCode,
      LoginScreen: [
        {
          Type: 'EMAIL',
          Content: EmailLabel
        },
        {
          Type: 'PASSWORD',
          Content: PasswordLabel
        },
        {
          Type: 'LOGIN',
          Content: LoginLabel
        },
        {
          Type: 'ONBOARD_PAGE_MESSAGE_1',
          Content: OnboardPageMessage1Label
        },
        {
          Type: 'ONBOARD_PAGE_MESSAGE_2',
          Content: OnboardPageMessage2Label
        },
        {
          Type: 'ONBOARD_PAGE_MESSAGE_3',
          Content: OnboardPageMessage3Label
        },
        {
          Type: 'CONTINUE',
          Content: LoginContinueLabel
        },
        {
          Type: 'CUSTOMIZE_MY_JOURNEY',
          Content: CustomizeMyJourneyLabel
        },
        {
          Type: 'WELCOME_TO',
          Content: WelcomeToLabel
        },
        {
          Type: 'POWERED_BY',
          Content: PoweredByLabel
        },
        {
          Type: 'AVAILABLE_CHANNELS',
          Content: AvailableChannelsLabel
        },
        {
          Type: 'INTERESTED_CHANNELS',
          Content: InterestedChannelsLabel
        },
        {
          Type: 'TERMS_AND_CONDITIONS',
          Content: LoginTermsAndConditionLabel
        },
        {
          Type: 'POLICY',
          Content: LoginPolicyLabel
        },
        {
          Type: 'TERMS_CHECKBOX_LABEL',
          Content: TermsCheckboxLabel
        },
        {
          Type: 'CUSTOMIZE_PAGE_MESSAGE',
          Content: CustomizePageMessageLabel
        },
        {
          Type: 'EMPTY_CHANNEL',
          Content: LoginEmptyChannelLabel
        }
      ],
      HomeScreen: [
        {
          Type: 'HOME',
          Content: HomeLabel
        },
        {
          Type: 'DISCOVER',
          Content: DiscoverLabel
        },
        {
          Type: 'CONTINUE_READING',
          Content: HomePageContinueReadingLabel
        },
        {
          Type: 'SEE_ALL',
          Content: SeeAllReading
        },
        {
          Type: 'FEATURED',
          Content: FeaturedLabel
        },
        {
          Type: 'MOST_POPULAR',
          Content: MostPopularLabel
        },
        {
          Type: 'NEW_RELEASE',
          Content: NewReleaseLabel
        },
        {
          Type: 'TRENDING',
          Content: TrendingLabel
        },
        {
          Type: 'SEARCH',
          Content: LoginSearchLabel
        },
        {
          Type: 'EMPTY',
          Content: LoginEmptyLabel
        },
        {
          Type: 'LOGIN',
          Content: LoginLoginLabel
        },
        {
          Type: 'EMPTY_DOWNLOAD_MESSAGE_2',
          Content: EmptyDownloadMessage2Label
        },
        {
          Type: 'DASHBOARD',
          Content: DashboardLabel
        },
        {
          Type: 'PAGE_LOADING_MESSAGE_1',
          Content: PageLoadingMessage1Label
        },
        {
          Type: 'PAGE_LOADING_MESSAGE_2',
          Content: PageLoadingMessage2Label
        },
        {
          Type: 'SIGN_UP',
          Content: SignUpLabel
        }
      ],
      ExploreScreen: [
        {
          Type: 'EXPLORE',
          Content: ExploreLabel
        },
        {
          Type: 'READ_MORE',
          Content: ReadMoreLabel
        },
        {
          Type: 'SHOW_LESS',
          Content: ShowLessLabel
        },
        {
          Type: 'NO_DESC',
          Content: NoDescLabel
        },
        {
          Type: 'PASS_CODE_BAR',
          Content: PassCodeBarLabel
        },
        {
          Type: 'PASS_CODE_TITLE',
          Content: PassCodeTitleLabel
        },
        {
          Type: 'PASS_CODE_DESC',
          Content: PassCodeDescLabel
        },
        {
          Type: 'PASS_CODE',
          Content: PassCodeLabel
        },
        {
          Type: 'PASS_CODE_SUBMIT',
          Content: PassCodeSubmitLabel
        },
        {
          Type: 'SEARCH',
          Content: ExploreSearchLabel
        },
        {
          Type: 'EMPTY',
          Content: ExploreEmptyLabel
        },
        {
          Type: 'ALL',
          Content: ExploreAllLabel
        },
        {
          Type: 'PUBLIC',
          Content: ExplorePublicLabel
        },
        {
          Type: 'PASSCODE',
          Content: ExplorePassCodeLabel
        },
        {
          Type: 'JOIN',
          Content: ExploreJoinLabel
        }
      ],
      FeedScreen: [
        {
          Type: 'POST',
          Content: FeedPostLabel
        },
        {
          Type: 'SEARCH',
          Content: FeedPageSearchLabel
        },
        {
          Type: 'EMPTY',
          Content: FeedPageEmptyLabel
        },
        {
          Type: 'FEED',
          Content: FeedFeedLabel
        }
      ],
      BookmarkScreen: [
        {
          Type: 'BOOKMARK',
          Content: BookmarksLabel
        },
        {
          Type: 'SEARCH',
          Content: BookmarkPageSearchLabel
        },
        {
          Type: 'EMPTY',
          Content: BookmarkPageEmptyLabel
        }
      ],
      DownloadScreen: [
        {
          Type: 'DOWNLOAD',
          Content: DownloadsLabel
        },
        {
          Type: 'SEARCH',
          Content: DownloadPageSearchLabel
        },
        {
          Type: 'EMPTY',
          Content: DownloadPageEmptyLabel
        }
      ],
      SectionScreen: [
        {
          Type: 'VIEW_CARD',
          Content: ViewCardLabel
        },
        {
          Type: 'START_FROM_BEGINNING',
          Content: StartFromBeginningLabel
        },
        {
          Type: 'SCROLL',
          Content: ScrollLabel
        },
        {
          Type: 'CONTINUE_READING',
          Content: SectionPageContinueReadingLabel
        },
        {
          Type: 'COMPLETED',
          Content: CompletedLabel
        },
        {
          Type: 'CONTINUE_TO_FEEDBACK',
          Content: ContinueToFeedbackLabel
        },
        {
          Type: 'NEXT',
          Content: NextLabel
        },
        {
          Type: 'PREVIOUS',
          Content: PreviousLabel
        }
      ],
      FeedbackScreen: [
        {
          Type: 'FEEDBACK',
          Content: FeedbackLabel
        },
        {
          Type: 'YES',
          Content: YesLabel
        },
        {
          Type: 'NO',
          Content: NoLabel
        },
        {
          Type: 'BACK_TO_HOME',
          Content: BackToHomeLabel
        },
        {
          Type: 'THANK_YOU',
          Content: ThankYouLabel
        },
        {
          Type: 'QUESTION_ONE',
          Content: QuestionOneLabel
        },
        {
          Type: 'QUESTION_TWO',
          Content: QuestionTwoLabel
        },
        {
          Type: 'QUESTION_THREE',
          Content: QuestionThreeLabel
        },
        {
          Type: 'QUESTION_FOUR',
          Content: QuestionFourLabel
        },
        {
          Type: 'INPUT_LABEL',
          Content: InputLabel
        }
      ],
      LanguageScreen: [
        {
          Type: 'LANGUAGE',
          Content: LanguageLabel
        }
      ],
      SideBar: [
        {
          Type: 'DOWNLOAD',
          Content: SidebarDownloadLabel
        },
        {
          Type: 'LANGUAGE',
          Content: SidebarLanguageLabel
        },
        {
          Type: 'LOGOUT',
          Content: SidebarLogoutLabel
        }
      ],
      DxCard: [
        {
          Type: 'POST',
          Content: DxCardPostLabel
        },
        {
          Type: 'INTERNET',
          Content: InternetLabel
        }
      ],
      DxModal: [
        {
          Type: 'CONTINUE',
          Content: ContinueLabel
        },
        {
          Type: 'GO_TO_HOMEPAGE',
          Content: GoToHomepageLabel
        },
        {
          Type: 'GO_BACK',
          Content: GoBackLabel
        }
      ],
      Loader: [
        {
          Type: 'LOADER',
          Content: LoaderLabel
        },
        {
          Type: 'LOADER_DESC',
          Content: LoaderDescLabel
        }
      ],
      Message: [
        {
          Type: 'INTERNET',
          Content: MessageInternetLabel
        },
        {
          Type: 'LOGIN_EMAIL_ERROR',
          Content: LoginEmailErrorLabel
        },
        {
          Type: 'LOGIN_PASSWORD_ERROR',
          Content: LoginPasswordErrorLabel
        },
        {
          Type: 'LOGIN_ERROR',
          Content: LoginErrorLabel
        },
        {
          Type: 'PASS_CODE_REQUIRED_ERROR',
          Content: PassCodeRequiredErrorLabel
        },
        {
          Type: 'PASS_CODE_ERROR',
          Content: PassCodeErrorLabel
        },
        {
          Type: 'PASS_CODE_DUPLICATE_ERROR',
          Content: PassCodeDuplicateErrorLabel
        },
        {
          Type: 'PASS_CODE_SUCCESS',
          Content: PassCodeSuccessLabel
        },
        {
          Type: 'DOWNLOAD_DELETE_SUCCESS',
          Content: DownloadDeleteSuccessLabel
        },
        {
          Type: 'BOOKMARK_ADD_SUCCESS',
          Content: BookmarkAddSuccessLabel
        },
        {
          Type: 'BOOKMARK_DELETE_SUCCESS',
          Content: BookmarkDeleteSuccessLabel
        },
        {
          Type: 'TERMS_AND_CONDITION',
          Content: TermsAndConditionLabel
        },
        {
          Type: 'REQUIRE_INTERNET_ACCESS',
          Content: RequireInternetAccessLabel
        },
        {
          Type: 'VIDEO_NOT_AVAILABLE',
          Content: VideoNotAvailableLabel
        },
        {
          Type: 'SEARCH',
          Content: SearchLabel
        }
      ],
      FirstInstall: [
        {
          Type: 'UPDATE_APPLICATION',
          Content: UpdateApplicationLabel
        },
        {
          Type: 'UPDATE_APPLICATION_MESSAGE',
          Content: UpdateApplicationMessageLabel
        },
        {
          Type: 'SELECT_LANGUAGE',
          Content: SelectLanguageLabel
        }
      ]
    };

    this.props.updateLanguageRequest(data);
  };

  render() {
    const { classes, isLanguageFetched } = this.props;
    const { expanded } = this.state;

    if (!isLanguageFetched) {
      return null;
    }

    return (
      <div style={{ width: 600, height: 'calc(100vh - 60px)', marginTop: 60 }}>
        <div className={classes.root}>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="outlined-name"
              label="Language Name"
              name="LanguageName"
              className={classes.textField}
              value={this.state.LanguageName}
              onChange={this.handleInputChange}
              margin="normal"
              variant="outlined"
              style={{ marginRight: 30 }}
            />
            <TextField
              id="outlined-name"
              label="Language Label"
              name="LanguageCode"
              className={classes.textField}
              value={this.state.LanguageCode}
              onChange={this.handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </form>

          <ExpansionPanel
            expanded={expanded === 'panel1'}
            onChange={this.handlePanelChange('panel1')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Login Page Labels
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="Login"
                  style={{ margin: 8 }}
                  name="LoginLabel"
                  value={this.state.LoginLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Email"
                  name="EmailLabel"
                  style={{ margin: 8 }}
                  value={this.state.EmailLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Password"
                  style={{ margin: 8 }}
                  name="PasswordLabel"
                  value={this.state.PasswordLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="We have created a personalized trip for you. Each trip is a collection of enriched and interactive content experience at your own pace."
                  style={{ margin: 8 }}
                  name="OnboardPageMessage1Label"
                  value={this.state.OnboardPageMessage1Label}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="You can now learn about specialized topics of interest through channels such as Channel 1, Channel 2, Channel 3 and more. Discover new channels and unlock the content that is published there."
                  style={{ margin: 8 }}
                  name="OnboardPageMessage2Label"
                  value={this.state.OnboardPageMessage2Label}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="All content is now accessible via a mobile app for a better content experience."
                  style={{ margin: 8 }}
                  name="OnboardPageMessage3Label"
                  value={this.state.OnboardPageMessage3Label}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Continue"
                  style={{ margin: 8 }}
                  name="LoginContinueLabel"
                  value={this.state.LoginContinueLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Customize My Journey"
                  style={{ margin: 8 }}
                  name="CustomizeMyJourneyLabel"
                  value={this.state.CustomizeMyJourneyLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Welcome to"
                  style={{ margin: 8 }}
                  name="WelcomeToLabel"
                  value={this.state.WelcomeToLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Powered by"
                  style={{ margin: 8 }}
                  name="PoweredByLabel"
                  value={this.state.PoweredByLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Available channels"
                  style={{ margin: 8 }}
                  name="AvailableChannelsLabel"
                  value={this.state.AvailableChannelsLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Interested channel"
                  style={{ margin: 8 }}
                  name="InterestedChannelsLabel"
                  value={this.state.InterestedChannelsLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Terms and conditions"
                  style={{ margin: 8 }}
                  name="LoginTermsAndConditionLabel"
                  value={this.state.LoginTermsAndConditionLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Policy"
                  style={{ margin: 8 }}
                  name="LoginPolicyLabel"
                  value={this.state.LoginPolicyLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Yes, I accept the terms and conditions below"
                  style={{ margin: 8 }}
                  name="TermsCheckboxLabel"
                  value={this.state.TermsCheckboxLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Choose at least one channel of topics that you like so that we can personalize the content for you."
                  style={{ margin: 8 }}
                  name="CustomizePageMessageLabel"
                  value={this.state.CustomizePageMessageLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="No channels available"
                  style={{ margin: 8 }}
                  name="LoginEmptyChannelLabel"
                  value={this.state.LoginEmptyChannelLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel2'}
            onChange={this.handlePanelChange('panel2')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Home Page Labels
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="Home"
                  style={{ margin: 8 }}
                  name="HomeLabel"
                  value={this.state.HomeLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Discover Content"
                  name="DiscoverLabel"
                  style={{ margin: 8 }}
                  value={this.state.DiscoverLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Continue Reading"
                  style={{ margin: 8 }}
                  name="HomePageContinueReadingLabel"
                  value={this.state.HomePageContinueReadingLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="See All"
                  style={{ margin: 8 }}
                  name="SeeAllReading"
                  value={this.state.SeeAllReading}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Featured"
                  name="FeaturedLabel"
                  style={{ margin: 8 }}
                  value={this.state.FeaturedLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Most Popular"
                  style={{ margin: 8 }}
                  name="MostPopularLabel"
                  value={this.state.MostPopularLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="New Releases"
                  style={{ margin: 8 }}
                  name="NewReleaseLabel"
                  value={this.state.NewReleaseLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Trending"
                  name="TrendingLabel"
                  style={{ margin: 8 }}
                  value={this.state.TrendingLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Search an experience.."
                  style={{ margin: 8 }}
                  name="LoginSearchLabel"
                  value={this.state.LoginSearchLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="No content found"
                  style={{ margin: 8 }}
                  name="LoginEmptyLabel"
                  value={this.state.LoginEmptyLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Login"
                  style={{ margin: 8 }}
                  name="LoginLoginLabel"
                  value={this.state.LoginLoginLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="to save and continue your experience on any device"
                  style={{ margin: 8 }}
                  name="EmptyDownloadMessage2Label"
                  value={this.state.EmptyDownloadMessage2Label}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Dashboard"
                  style={{ margin: 8 }}
                  name="DashboardLabel"
                  value={this.state.DashboardLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Hang on! We personalize your content journey according to your interests."
                  style={{ margin: 8 }}
                  name="PageLoadingMessage1Label"
                  value={this.state.PageLoadingMessage1Label}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="It may take a few seconds..."
                  style={{ margin: 8 }}
                  name="PageLoadingMessage2Label"
                  value={this.state.PageLoadingMessage2Label}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Signup"
                  style={{ margin: 8 }}
                  name="SignUpLabel"
                  value={this.state.SignUpLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel3'}
            onChange={this.handlePanelChange('panel3')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Explore Page Labels
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="Explore"
                  style={{ margin: 8 }}
                  name="ExploreLabel"
                  value={this.state.ExploreLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Read more"
                  style={{ margin: 8 }}
                  name="ReadMoreLabel"
                  value={this.state.ReadMoreLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Show less"
                  style={{ margin: 8 }}
                  name="ShowLessLabel"
                  value={this.state.ShowLessLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="No Description"
                  style={{ margin: 8 }}
                  name="NoDescLabel"
                  value={this.state.NoDescLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Do you have an access code to join a channel?"
                  style={{ margin: 8 }}
                  name="PassCodeBarLabel"
                  value={this.state.PassCodeBarLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="PRIVATE ACCESS CODE"
                  style={{ margin: 8 }}
                  name="PassCodeTitleLabel"
                  value={this.state.PassCodeTitleLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Unlock & view free content published via access code protected channel"
                  style={{ margin: 8 }}
                  name="PassCodeDescLabel"
                  value={this.state.PassCodeDescLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Enter access code here"
                  style={{ margin: 8 }}
                  name="PassCodeLabel"
                  value={this.state.PassCodeLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Submit"
                  style={{ margin: 8 }}
                  name="PassCodeSubmitLabel"
                  value={this.state.PassCodeSubmitLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="No channels found"
                  style={{ margin: 8 }}
                  name="ExploreEmptyLabel"
                  value={this.state.ExploreEmptyLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Search a channel.."
                  style={{ margin: 8 }}
                  name="ExploreSearchLabel"
                  value={this.state.ExploreSearchLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="All"
                  style={{ margin: 8 }}
                  name="ExploreAllLabel"
                  value={this.state.ExploreAllLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Public"
                  style={{ margin: 8 }}
                  name="ExplorePublicLabel"
                  value={this.state.ExplorePublicLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Passcode"
                  style={{ margin: 8 }}
                  name="ExplorePassCodeLabel"
                  value={this.state.ExplorePassCodeLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Join"
                  style={{ margin: 8 }}
                  name="ExploreJoinLabel"
                  value={this.state.ExploreJoinLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel4'}
            onChange={this.handlePanelChange('panel4')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Feed Page Labels
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="posts"
                  style={{ margin: 8 }}
                  name="FeedPostLabel"
                  value={this.state.FeedPostLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Search an experience.."
                  style={{ margin: 8 }}
                  name="FeedPageSearchLabel"
                  value={this.state.FeedPageSearchLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="No Streams found"
                  style={{ margin: 8 }}
                  name="FeedPageEmptyLabel"
                  value={this.state.FeedPageEmptyLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Feeds"
                  style={{ margin: 8 }}
                  name="FeedFeedLabel"
                  value={this.state.FeedFeedLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel5'}
            onChange={this.handlePanelChange('panel5')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Bookmarks Page Labels
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="Bookmarks"
                  style={{ margin: 8 }}
                  name="BookmarksLabel"
                  value={this.state.BookmarksLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Search an bookmark.."
                  style={{ margin: 8 }}
                  name="BookmarkPageSearchLabel"
                  value={this.state.BookmarkPageSearchLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="No bookmarks found"
                  style={{ margin: 8 }}
                  name="BookmarkPageEmptyLabel"
                  value={this.state.BookmarkPageEmptyLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel6'}
            onChange={this.handlePanelChange('panel6')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Download Page Labels
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="Download"
                  style={{ margin: 8 }}
                  name="DownloadsLabel"
                  value={this.state.DownloadsLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Search an download.."
                  style={{ margin: 8 }}
                  name="DownloadPageSearchLabel"
                  value={this.state.DownloadPageSearchLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="No downloads found"
                  style={{ margin: 8 }}
                  name="DownloadPageEmptyLabel"
                  value={this.state.DownloadPageEmptyLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel7'}
            onChange={this.handlePanelChange('panel7')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Section Page Labels
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="View card"
                  style={{ margin: 8 }}
                  name="ViewCardLabel"
                  value={this.state.ViewCardLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Start from beginning"
                  style={{ margin: 8 }}
                  name="StartFromBeginningLabel"
                  value={this.state.StartFromBeginningLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="SCROLL DOWN TO VIEW MORE"
                  style={{ margin: 8 }}
                  name="ScrollLabel"
                  value={this.state.ScrollLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="CONTINUE READING"
                  style={{ margin: 8 }}
                  name="SectionPageContinueReadingLabel"
                  value={this.state.SectionPageContinueReadingLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="COMPLETED"
                  style={{ margin: 8 }}
                  name="CompletedLabel"
                  value={this.state.CompletedLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="CONTINUE TO FEEDBACK"
                  style={{ margin: 8 }}
                  name="ContinueToFeedbackLabel"
                  value={this.state.ContinueToFeedbackLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Next"
                  style={{ margin: 8 }}
                  name="NextLabel"
                  value={this.state.NextLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Previous"
                  style={{ margin: 8 }}
                  name="PreviousLabel"
                  value={this.state.PreviousLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel8'}
            onChange={this.handlePanelChange('panel8')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Feedback Page Labels
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="Feedback"
                  style={{ margin: 8 }}
                  name="FeedbackLabel"
                  value={this.state.FeedbackLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Yes"
                  style={{ margin: 8 }}
                  name="YesLabel"
                  value={this.state.YesLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="No"
                  style={{ margin: 8 }}
                  name="NoLabel"
                  value={this.state.NoLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="BACK TO HOME"
                  style={{ margin: 8 }}
                  name="BackToHomeLabel"
                  value={this.state.BackToHomeLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Thank You"
                  style={{ margin: 8 }}
                  name="ThankYouLabel"
                  value={this.state.ThankYouLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Did you find this content useful?"
                  style={{ margin: 8 }}
                  name="QuestionOneLabel"
                  value={this.state.QuestionOneLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="How do you like this content experience?"
                  style={{ margin: 8 }}
                  name="QuestionTwoLabel"
                  value={this.state.QuestionTwoLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Do you want to save this content to your wallet for easy retrival?"
                  style={{ margin: 8 }}
                  name="QuestionThreeLabel"
                  value={this.state.QuestionThreeLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Please share your experience below"
                  style={{ margin: 8 }}
                  name="QuestionFourLabel"
                  value={this.state.QuestionFourLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Type something..."
                  style={{ margin: 8 }}
                  name="InputLabel"
                  value={this.state.InputLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel9'}
            onChange={this.handlePanelChange('panel9')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Language Page Labels
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="Language"
                  style={{ margin: 8 }}
                  name="LanguageLabel"
                  value={this.state.LanguageLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel10'}
            onChange={this.handlePanelChange('panel10')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Loader Labels</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="LOADING CONTENT"
                  style={{ margin: 8 }}
                  name="LoaderLabel"
                  value={this.state.LoaderLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Some sections in this content requires Internet Access"
                  style={{ margin: 8 }}
                  name="LoaderDescLabel"
                  value={this.state.LoaderDescLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel11'}
            onChange={this.handlePanelChange('panel11')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>DxCard Labels</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="Posted in"
                  style={{ margin: 8 }}
                  name="DxCardPostLabel"
                  value={this.state.DxCardPostLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="You require internet access to view this content"
                  style={{ margin: 8 }}
                  name="InternetLabel"
                  value={this.state.InternetLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel12'}
            onChange={this.handlePanelChange('panel12')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                DxModal Labels
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="CONTINUE"
                  style={{ margin: 8 }}
                  name="ContinueLabel"
                  value={this.state.ContinueLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="GO TO HOMEPAGE"
                  style={{ margin: 8 }}
                  name="GoToHomepageLabel"
                  value={this.state.GoToHomepageLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="GO BACK"
                  style={{ margin: 8 }}
                  name="GoBackLabel"
                  value={this.state.GoBackLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel13'}
            onChange={this.handlePanelChange('panel13')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Sidebar Labels
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="Downloads"
                  style={{ margin: 8 }}
                  name="SidebarDownloadLabel"
                  value={this.state.SidebarDownloadLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Language"
                  style={{ margin: 8 }}
                  name="SidebarLanguageLabel"
                  value={this.state.SidebarLanguageLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Logout"
                  style={{ margin: 8 }}
                  name="SidebarLogoutLabel"
                  value={this.state.SidebarLogoutLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel14'}
            onChange={this.handlePanelChange('panel14')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Message Labels
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="No internet connection"
                  style={{ margin: 8 }}
                  name="MessageInternetLabel"
                  value={this.state.MessageInternetLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Email cannot be empty"
                  style={{ margin: 8 }}
                  name="LoginEmailErrorLabel"
                  value={this.state.LoginEmailErrorLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Password cannot be empty"
                  style={{ margin: 8 }}
                  name="LoginPasswordErrorLabel"
                  value={this.state.LoginPasswordErrorLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Login id does not exist or password is incorrect"
                  style={{ margin: 8 }}
                  name="LoginErrorLabel"
                  value={this.state.LoginErrorLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Channel code is required"
                  style={{ margin: 8 }}
                  name="PassCodeRequiredErrorLabel"
                  value={this.state.PassCodeRequiredErrorLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Experience channel not found"
                  style={{ margin: 8 }}
                  name="PassCodeErrorLabel"
                  value={this.state.PassCodeErrorLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Invitation channel already subscribed"
                  style={{ margin: 8 }}
                  name="PassCodeDuplicateErrorLabel"
                  value={this.state.PassCodeDuplicateErrorLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Successfully subscribed to the channel"
                  style={{ margin: 8 }}
                  name="PassCodeSuccessLabel"
                  value={this.state.PassCodeSuccessLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Successfully delete download"
                  style={{ margin: 8 }}
                  name="DownloadDeleteSuccessLabel"
                  value={this.state.DownloadDeleteSuccessLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Successfully bookmarked"
                  style={{ margin: 8 }}
                  name="BookmarkAddSuccessLabel"
                  value={this.state.BookmarkAddSuccessLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Successfully delete bookmark"
                  style={{ margin: 8 }}
                  name="BookmarkDeleteSuccessLabel"
                  value={this.state.BookmarkDeleteSuccessLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Please Accept terms and conditions"
                  style={{ margin: 8 }}
                  name="TermsAndConditionLabel"
                  value={this.state.TermsAndConditionLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="You require internet access to view this content"
                  style={{ margin: 8 }}
                  name="RequireInternetAccessLabel"
                  value={this.state.RequireInternetAccessLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Video not available"
                  style={{ margin: 8 }}
                  name="VideoNotAvailableLabel"
                  value={this.state.VideoNotAvailableLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Search..."
                  style={{ margin: 8 }}
                  name="SearchLabel"
                  value={this.state.SearchLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === 'panel15'}
            onChange={this.handlePanelChange('panel15')}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>FirstInstall</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="UPDATE APPLICATION"
                  style={{ margin: 8 }}
                  name="UpdateApplicationLabel"
                  value={this.state.UpdateApplicationLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="Please update your app to version"
                  style={{ margin: 8 }}
                  name="UpdateApplicationMessageLabel"
                  value={this.state.UpdateApplicationMessageLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  id="outlined-full-width"
                  label="Please select language"
                  style={{ margin: 8 }}
                  name="SelectLanguageLabel"
                  value={this.state.SelectLanguageLabel}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <div style={styles.buttonWrapperStyle}>
          <Button
            style={styles.btnStyle}
            variant="contained"
            color="primary"
            onClick={this.handleLabelSubmit}
          >
            <Edit style={{ marginRight: 5 }} /> Update Language
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  buttonWrapperStyle: {
    width: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  btnStyle: {
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    marginTop: 24,
    marginBottom: 48
  }
};

const rootStyles = theme => ({
  root: {
    width: 600,
    padding: 20
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1
  },
  textField: {
    flex: 'calc(50% - 30px)'
  }
});

const stateToProps = state => ({
  navArr: state.root.navArr,
  isCompleted: state.languages.isCompleted,
  isLanguageFetched: state.languages.isLanguageFetched,
  language: state.languages.language
});

const dispatchToProps = dispatch => ({
  dxAlertAction: (isDisplay, isError, message) =>
    dispatch(dxAlertAction(isDisplay, isError, message)),
  languageViewRequest: languageGUID =>
    dispatch(actions.languageViewRequest(languageGUID)),
  updateLanguageRequest: data => dispatch(actions.updateLanguageRequest(data))
});

export default connect(
  stateToProps,
  dispatchToProps
)(withStyles(rootStyles)(EditLanguageContainer));
