const Feed = require('../schemas/feed');
const User = require('../schemas/user');
const moment = require("moment");

/**
 * 2022. 04. 11. HSYOO.
 * TODO:
 *  1. req.body 내 feedType, userId 필수 값 체크 (Joi 필요.)
 *      1-1. feedType 값이 all인 경우 userId값은 체크하지 않는다.
 *      1-2. feedType 값이 user인 경우 userId값은 반드시 존재해야 한다.
 *  2. req.body 내 XSS 취약점 관련 방어코드 기재. (sanitaze-html 필요.)
 *  3. 요청받은 feed 조회
 *      3-1. feedType이 user인 경우
 *          - Feed 컬렉션 내 요청받은 userId와 같은 데이터 조회 후 해당 데이터 response.
 *      3-2. feedType이 all인 경우
 *          - Feed 컬렉션 내 모든 데이터 조회 후 해당 데이터 response.
 *      3-3. 정의되지 않은 feedType인 경우
 *          - FAIL 처리
 * 
 * FIXME: 
 *  1. sanitize-html을 helmet으로 바꿔서 적용해보자. 보안관련이슈가 작용할 것으로 보인다.
 */
async function selectFeed(req, res){
    /*========================================================================================================
    #swagger.tags = ['Feed']
    #swagger.summary = '개인 또는 전체피드 조회'
    #swagger.description = '<p>개인피드 또는 전체피드를 조회합니다. <br />이스케이프 문자가 먹습니까?</p>'
    #swagger.parameters['feedType'] = {
        in: 'query'
    }
    ========================================================================================================*/
    const {feedType, userId} = req.query;

    let feedList;
    if(feedType === 'user'){
        feedList = await Feed.find({userId: userId}).sort({regDate: -1});
    }else if(feedType === 'all'){
        feedList = await Feed.find({}).sort({regDate: -1});
    }else{
        /*=====================================================================================
        #swagger.responses[400] = {
            description: '비정상적인 값을 응답받았을 때, 아래 예제와 같은 형태로 응답받습니다.',
            schema: {
                "result": "FAIL",
                'message': 'Server Error - 정의되지 않은 feedType.'
            }
        }
        =====================================================================================*/
        return res.status(400).json({ result: 'FAIL', message: 'Server Error - 정의되지 않은 feedType.' });
    }

    // 데이터가 존재하지 않는다면 400 에러를 내려준다.
    if(!feedList.length) return res.status(400).json({ result: 'FAIL', message: '데이터가 존재하지 않습니다.' });

    /*=====================================================================================
    #swagger.responses[200] = {
        description: '정상적인 값을 응답받았을 때, 아래 예제와 같은 형태로 응답받습니다.',
        schema: {
            "feedList": [{
                "_id": "62504ef691595a092dee7eae",
                "feedId": "1",
                "content": "content1",
                "image": "test image"
                }]
        }
    }
    =====================================================================================*/
    res.status(200).json({result: 'SUCCESS', feedList: feedList});
}

/**
 * 2022. 04. 11. HSYOO.
 * TODO:
 *  1. 입력받은 Feed Data 체크
 *      1-1. 필수입력값 userId, content 체크
 *  2. regDate는 서버 내 생성 (YYYY-MM-DD HH:mm:ss 형식)
 * 
 * FIXME: 
 *  1. XSS 방어코드 기재필요.
 */
async function insertFeed(req, res){
    /*========================================================================================================
    #swagger.tags = ['Feed']
    #swagger.summary = '피드 저장'
    #swagger.description = '<p>사용자가 입력한 피드를 저장합니다. <br />이스케이프 문자가 먹습니까?</p>'
    #swagger.parameters['feedType'] = {
        in: 'body'
    }
    ========================================================================================================*/
    const {userId, content, image} = req.body;
    const regDate = moment().format("YYYY-MM-DD HH:mm:ss");

    // 데이터가 존재하지 않는다면 400 에러를 내려준다.
    // const user = await Feed.findOne({userId: userId}).sort({regDate: -1});
    // if(user === null) return res.status(400).json({ result: 'FAIL', message: 'User 정보가 존재하지 않습니다.' });

    //등록된 피드가 추후 수정된다면, modDate document가 존재해야 하기때문에 빈 문자열을 삽입한다.
    await Feed.create({ userId, content, image, regDate, modDate: '' });
    res.status(201).json({result: 'SUCCESS', message: '피드생성완료.'});
}

/**
 * 2022. 04. 11. HSYOO.
 * 
 * TODO:
 *  1. 필수입력값 feedId 존재여부 체크.
 *  2. 수정할 피드가 존재하는지 체크.
 *      2-1. 존재하지 않는다면, 400 에러 return
 *  3. 요청받은 feedId 수정처리.
 * 
 * FIXME: 
 *  1. XSS 방어코드 기재필요.
 */
async function updateFeed(req, res){
    const {feedId, content, image} = req.body;
    const modDate = moment().format("YYYY-MM-DD HH:mm:ss");

    //삭제할 피드가 DB에 존재하는지 체크한다. 존재하지 않으면 status code 400을 클라이언트에 내려준다.
    const feed = await Feed.findOne({feedId: feedId});
    if(feed === null) return res.status(400).json({ result: 'FAIL', message: '수정할 Feed 정보가 존재하지 않습니다.' });

    await Feed.updateOne({ feedId: feedId }, { $set: { content: content, image: image, modDate: modDate } });
    res.status(201).json({ result: 'SUCCESS', message: '피드수정완료.' });
}

/**
 * 2022. 04. 11. HSYOO.
 * TODO:
 *  1. 필수입력값 feedId 존재여부 체크.
 *  2. 삭제할 피드가 존재하는지 체크.
 *      2-1. 존재하지 않는다면, 400 에러 return
 *  3. 요청받은 feedId 삭제처리.
 * 
 * FIXME: 
 *  1. XSS 방어코드 기재필요.
 */
 async function deleteFeed(req, res){
    const {feedId} = req.body;

    // 삭제할 피드가 DB에 존재하는지 체크한다. 존재하지 않으면 status code 400을 클라이언트에 내려준다.
    const feed = await Feed.findOne({feedId: feedId});
    if(feed === null) return res.status(400).json({ result: 'FAIL', message: '삭제할 Feed 정보가 존재하지 않습니다.' });

    await Feed.deleteOne({ feedId: feedId});
    res.status(201).json({result: 'SUCCESS', message: '피드삭제완료.'});
}

module.exports = {
    selectFeed,
    insertFeed,
    updateFeed,
    deleteFeed
};