const Feed = require('../schemas/feed');

/**
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

module.exports = {
    selectFeed
};