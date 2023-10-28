import http from "../../../services/Http"
const CreateBannerUrl = "admin/uploadNewAdBanner"
const GetBannerUrl = "common/getAdBanners"
const GetPrizeUrl = "common/getPrizes"
const GetClientUrl = "common/getClients"
const DetBannerUrl = "admin/deleteAdBanner/"
const CreatePrizeUrl = "admin/uploadPrize"
const DetPrizeUrl = "admin/deleteprize/"
const GetPredicitionUrl = "LiveData/getAllActiveLeague"
const GetleaguesteamUrl = "LiveData/getMatchesForTheTournament"
const UploadClientUrL = "admin/uploadClient"
const DeleteClientUrl = "admin/deleteClient/"
const MatchdaysUrl = "admin/saveLeagueAndMatchday"
const ChoosematchUrl = "admin/getMatchdays/"
const Pick6dataUrl = "admin/submitPickSix"
const PostquestionUrl = "admin/createQuestion";
const GetquestionUrl = "admin/getQuestions";
const GetQuestionOptions = "admin/getQuestionOptions"
const GetquestionSingleUrl = "admin/getSingleQuestionOptions/";
const DeletequestionUrl = "admin/deleteQuestion";
const CreatequestionsUrl = "admin/createQuestionOption/";
const UpdatequestionsUrl = "admin/updateQuestion/";
const updateAnswerOption = "admin/updateAnswerOption/";

const Adminhometopbannertable = (data) => {
  return http.Post(CreateBannerUrl, data)
}

const GetAdminhometopbannertable = (data) => {
  return http.Get(GetBannerUrl);
};
const DelAdminhometopbannertable = (data) => {
  let del = `${DetBannerUrl}${data}`;
  return http.Post(del);
};
const Adminprizetable = (data) => {
  return http.Post(CreatePrizeUrl, data);
};
const GetAdminprizetable = (data) => {
  return http.Get(GetPrizeUrl);
};
const DelAdminprizetable = (data) => {
  let del = `${DetPrizeUrl}${data}`;
  return http.Post(del);
};

const Getpredictiontable = (data) => {
  return http.Get(GetPredicitionUrl);
};

const Getteams = (data) => {
  return http.Post(GetleaguesteamUrl, data);
};
const Addmatchdays = (data) => {
  return http.Post(MatchdaysUrl, data);
};
const ChooseLeague = (data) => {
  return http.Get(ChoosematchUrl, data);
};
const Postquestions = (data) => {
  return http.Post(PostquestionUrl, data);
};

const Getquestions = (data) => {
  return http.Get(GetquestionUrl, data);
};

const Deletequestions = (data) => {
  let del = `${DeletequestionUrl}/${data}`;
  return http.Post(del);
};

const Picksix = (data) => {
  return http.Post(Pick6dataUrl, data)
}

const CreateQuestion = (data, id) => {
  let createUrl = `${CreatequestionsUrl}${id}`;
  return http.Post(createUrl, data);
};

const updateQuestion = (data, id) => {
  let createUrl = `${UpdatequestionsUrl}${id}`;
  return http.Post(createUrl, data);
};


const GetquestionSingle = (data) => {
  return http.Post(GetquestionSingleUrl, data);
};


const GetquestionOptions = (data) => {
  return http.Get(GetQuestionOptions, data);
};


const UpdateAnswerOptions = (data, id) => {
  let updateUrl = `${updateAnswerOption}${id}`;
  return http.Post(updateUrl, data);
}

const UploadClient = (data) => {
  return http.Post(UploadClientUrL, data);
};

const DeleteClient = (data) => {
  let del = `${DeleteClientUrl}${data}`;
  return http.Post(del);
};
const GetClienttable = (data) => {
  return http.Get(GetClientUrl);
};


export default {
  Adminhometopbannertable: Adminhometopbannertable,
  GetAdminhometopbannertable: GetAdminhometopbannertable,
  DelAdminhometopbannertable: DelAdminhometopbannertable,
  Adminprizetable: Adminprizetable,
  GetAdminprizetable: GetAdminprizetable,
  DelAdminprizetable: DelAdminprizetable,
  Getpredictiontable: Getpredictiontable,
  Getteams: Getteams,
  UploadClient: UploadClient,
  DeleteClient: DeleteClient,
  GetClienttable: GetClienttable,
  Addmatchdays: Addmatchdays,
  ChooseLeague: ChooseLeague,
  Picksix: Picksix,
  Postquestions: Postquestions,
  updateQuestion: updateQuestion,
  Getquestions: Getquestions,
  Deletequestions: Deletequestions,
  CreateQuestion: CreateQuestion,
  UpdateAnswerOptions: UpdateAnswerOptions,
  GetquestionSingle: GetquestionSingle,
  GetquestionOptions: GetquestionOptions,
};
