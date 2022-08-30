const axios = require('axios');
const { errorType } = require('../utils/consts');
const { BingURL, wallpaperApi, Unsplash } = require('../config/links');
const {
	blogRouter,
	handleRequest,
	handleRequestError,
} = require('../utils/index');

/**
 * @api {get} /links/bingWallpaper bingWallpaper
 * @apiName bingWallpaper
 * @apiGroup Links
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "msg": "success",
 *       "data": "{...}"
 *       "code": 200
 *     }
 */
// 必应壁纸
blogRouter.get('/bingWallpaper', function (req, res) {
	let request = axios.get(wallpaperApi).then(function (result) {
		let output = [];
		let data = result.data.images;
		for (let i = 0; i < data.length; i++) {
			output.push(BingURL + data[i].url);
		}
		return output;
	});

	handleRequest(request, res);
});

/**
 * @api {get} /links/unsplash?pageSize=10&pageNum=1  unsplash
 * @apiName unsplash
 * @apiGroup Links
 * @apiQuery {Number} pageSize pageSize
 * @apiQuery {Number} pageNum pageNum
 * @apiSuccessExample Success-Response:
 *     {
 *       "msg": "success",
 *       "data": "{...}"
 *       "code": 200
 *     }
 */
// unsplash 壁纸
blogRouter.get('/unsplash', function (req, res) {
	let { pageSize, pageNum } = req.query;
	if (pageSize && pageNum) {
		let request = axios
			.get(Unsplash(pageNum, pageSize))
			.then(function (result) {
				let output = [];
				let data = result.data;
				for (let i = 0; i < data.length; i++) {
					output.push({
						raw: data[i].urls.raw,
						full: data[i].urls.full,
						regular: data[i].urls.regular,
						small: data[i].urls.small,
						thumb: data[i].urls.thumb,
						small_s3: data[i].urls.small_s3,
					});
				}
				return output;
			});
		handleRequest(request, res);
	} else {
		handleRequestError(errorType.params_in, res);
	}
});

/**
 * @api {get} /links/getOuterLinks getOuterLinks
 * @apiName getOuterLinks
 * @apiGroup Links
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "msg": "success",
 *       "data": "{...}"
 *       "code": 200
 *     }
 */
//页尾链接
blogRouter.get('/getOuterLinks', function (req, res) {
	res.send({
		msg: 'success',
		code: 200,
		data: {
			thanks: [
				{
					link: 'https://unsplash.com/',
					name: 'Unsplash',
				},
				{
					link: 'https://flatuicolors.com/',
					name: 'Flatuicolors',
				},
				{
					link: 'https://burst.shopify.com/',
					name: 'Shopify',
				},
				{
					link: 'https://cn.bing.com/',
					name: 'Bing',
				},
				{
					link: 'https://unsplash.com/',
					name: 'Unsplash',
				},
				{
					link: 'https://flatuicolors.com/',
					name: 'Flatuicolors',
				},
				{
					link: 'https://burst.shopify.com/',
					name: 'Shopify',
				},
				{
					link: 'https://cn.bing.com/',
					name: 'Bing',
				},
			],
			tools: [
				{
					link: 'https://unsplash.com/',
					name: 'Unsplash',
				},
				{
					link: 'https://flatuicolors.com/',
					name: 'Flatuicolors',
				},
				{
					link: 'https://burst.shopify.com/',
					name: 'Shopify',
				},
				{
					link: 'https://cn.bing.com/',
					name: 'Bing',
				},
			],
		},
	});
});

module.exports = blogRouter;
