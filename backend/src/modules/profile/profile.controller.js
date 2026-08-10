import * as profileService from "./profile.service.js";
import ApiResponse from "../../common/utils/apiResponse.js";
import * as profileRanking from "./profile.ranking.js";


const getMyProfile = async (req, res) => {
  const profile = await profileService.getMyProfile(
    req.user.id
  );

  return ApiResponse.ok(
    res,
    "Profile fetched successfully",
    profile
  );
};

const getMyGameHistory = async (req, res) => {
  const history = await profileService.getMyGameHistory(
    req.user.id
  );

  return ApiResponse.ok(
    res,
    "Game history fetched successfully",
    history
  );
};


const getMyRank = async (req, res) => {
  const rankings = await profileRanking.getMyRank(
    req.user.id
  );

  return ApiResponse.ok(
    res,
    "User rankings fetched successfully",
    rankings
  );
};

export {
  getMyProfile,
  getMyGameHistory,
  getMyRank

};