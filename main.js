'use strict';
const o = { v: null };
class V {
	static gi(dels = []) {
		if (!o.v) {
			o.v = new V();
		}
		for (let del of dels) {
			o.v.r(del);
		}
		return o.v;
	}
	constructor() {
		const d = document;
		this.d = d;
		this.w = window;
		this.x = this.tn('html');
		this.b = this.tn('body');
		this.h = this.tn('head');
	}
	c(tag) {
		return this.d.createElement(tag);
	}
	a(parent, elm) {
		return parent.appendChild(elm);
	}
	ab(e) {
		this.a(this.b, e);
	}
	ael(elm, eventName, callback) {
		if (typeof elm === 'string') {
			const el = this.gid(elm);
			el.addEventListener(eventName, callback);
			return;
		}
		elm.addEventListener(eventName, callback);
	}
	gid(id) {
		return this.d.getElementById(id);
	}
	ct(tag, text, className) {
		const elm = this.c(tag);
		elm.textContent = text;
		elm.className = className ? className : '';
		return elm;
	}
	r(tag) {
		const es = this.d.getElementsByTagName(tag);
		if (!es) {
			return es;
		}
		for (let e of es) {
			this.re(e);
		}
	}
	re(e) {
		const p = e.parent ? e.parent : this.d;
		if (e.parent) {
			p.removeChild(e);
		} else {
			e.remove();
		}
	}
	tn(tag) {
		return this.d.getElementsByTagName(tag)[0];
	}
}
const v = V.gi();
class FL {
	static l(event) {
		const f = (resolve) => {
			const target = event.target;
			const files = target.files;
			const file = files[0];
			const fr = new FileReader();
			fr.addEventListener(
				'load',
				() => {
					const b64d = fr.result;
					resolve({ b64d, file });
				},
				false
			);
			if (!file) {
				resolve({});
				return;
			}
			fr.readAsDataURL(file);
		};
		return new Promise(f);
	}
	static dl(fileName, blob, contentType = 'application/octetstream', isDataScheme) {
		const d = v.gid('dlLinkAncker');
		d.download = fileName;
		d.href = isDataScheme ? blob : URL.createObjectURL(blob, { type: contentType });
		d.click();
		setTimeout(() => {
			URL.revokeObjectURL(d.href);
		}, 1000);
	}
}
const te = new TextEncoder('utf-8');
const td = new TextDecoder('utf-8');
class Hasher {
	static async sha256(m, sc = 1, t = 'base64') {
		return await Hasher.d(m, 'SHA-256', sc, t);
	}
	static async sha384(m, sc = 1, t = 'base64') {
		return await Hasher.d(m, 'SHA-384', sc, t);
	}
	static async sha512(m, sc = 1, t = 'base64') {
		return await Hasher.d(m, 'SHA-512', sc, t);
	}
	static async sha1(m, sc = 1, t = 'base64') {
		return await Hasher.d(m, 'SHA-1', sc, t);
	}
	static async d(m, a = 'SHA-256', sc = 1, t) {
		let s = te.encode(m);
		let r = null;
		for (let i = 0; i < sc; i++) {
			r = await window.crypto.subtle.digest(a, r ? r : s);
		}
		return t === 'base64' ? Base64Util.aToB64(r) : t === 'base64url' ? Base64Util.aToB64u(r) : t === 'raw' ? r : Base64Util.aToHex(r);
	}
}

const max = 50000;
class Base64Util {
	static from64(d) {
		const b = Base64Util.b64ToU8a(d);
		const u16a = new Uint16Array(b.buffer);
		const l = u16a.length;
		const c = Math.ceil(l / max);
		const r = [];
		for (let j = 0; j < c; j++) {
			const start = max * j;
			const size = l - start;
			const p = size > max ? max : size > 0 ? size : l;
			const u = u16a.slice(start, start + p);
			r.push(String.fromCharCode(...u));
		}
		return r.join('');
	}
	static to64(s) {
		const len = s.length;
		const pageNum = Math.ceil(len / max);
		const results = [];
		for (let j = 0; j < pageNum; j++) {
			const start = max * j;
			const size = len - start;
			const p = size > max ? max : size > 0 ? size : len;
			const end = start + p;
			const input = s.substring(start, end);
			const u = new Uint16Array(p);
			for (let i = 0; i < p; i++) {
				u[i] = input.charCodeAt(i);
			}
			const c = String.fromCharCode(...new Uint8Array(u.buffer));
			results.push(c);
		}
		return btoa(results.join(''));
	}
	static b64ToU8a(d) {
		const a = atob(d);
		const b = new Uint8Array(a.length);
		for (let i = 0; i < b.length; i++) {
			try {
				b[i] = a.charCodeAt(i);
			} catch (e) {
				console.log(i);
				console.log(e);
			}
		}
		return b;
	}
	static u8a2b64(u8a) {
		const bs = Base64Util.u8a2bs(u8a);
		return btoa(bs);
	}
	static s2u8a(s) {
		const d = Base64Util.to64(s);
		return Base64Util.b64ToU8a(d);
	}
	static b64uToAb(b) {
		const d = Base64Util.toB64(b);
		return Base64Util.b64ToU8a(d).buffer;
	}
	static u8a2bs(u8a) {
		const r = [];
		for (let e of u8a) {
			r.push(String.fromCharCode(e));
		}
		return r.join('');
	}

	static ab2bs(ab) {
		return Base64Util.u8a2bs(new Uint8Array(ab));
	}
	static aToB64(ai) {
		const ab = ai.buffer ? ai.buffer : ai;
		return btoa(Base64Util.ab2bs(ab));
	}
	static aToB64u(ai) {
		const b = Base64Util.aToB64(ai);
		return Base64Util.toB64u(b);
	}
	static b64toHex(b64) {
		const bs = atob(b64);
		const u8a = Base64Util.bs2u8a(bs);
		const rl = [];
		for (let i of u8a) {
			rl.push(i.toString(16));
		}
		return rl.join('');
	}
	static aToHex(ai) {
		const u8a = ai.buffer ? new Uint8Array(ai.buffer) : new Uint8Array(ai);
		const rl = [];
		for (let i of u8a) {
			const a = i.toString(16);
			rl.push(('00' + a).slice(-2));
		}
		return rl.join('');
	}
	static bs2u8a(bs) {
		const l = bs.length;
		const a = new Uint8Array(new ArrayBuffer(l));
		for (let i = 0; i < l; i++) {
			a[i] = bs.charCodeAt(i);
		}
		return a;
	}

	static bs2utf8(bs) {
		const u8a = Base64Util.bs2u8a(bs);
		return td.decode(u8a.buffer);
	}
	static dataURI2bs(dURI) {
		return atob(dURI.split(',')[1]);
	}
	static dataURI2u8a(dURI) {
		return Base64Util.bs2u8a(atob(dURI.split(',')[1]));
	}
	static ab2dataURI(ab, type = 'application/octet-stream') {
		const b = btoa(Base64Util.ab2bs(ab));
		return 'data:' + type + ';base64,' + b;
	}
	static joinU8as(u8as) {
		let l = 0;
		for (let u8a of u8as) {
			l += u8a.length;
		}
		const r = new Uint8Array(l);
		let s = 0;
		for (let u8a of u8as) {
			r.set(u8a, s);
			s += u8a.length;
		}
		return r;
	}
	static toB64u(b) {
		return b ? b.split('+').join('-').split('/').join('_').split('=').join('') : b;
	}
	static toB64(b64u) {
		const l = b64u.length;
		const c = l % 4 > 0 ? 4 - (l % 4) : 0;
		let b = b64u.split('-').join('+').split('_').join('/');

		for (let i = 0; i < c; i++) {
			b += '=';
		}
		return b;
	}
	static async sig(u8a) {
		const bs = Base64Util.u8a2bs(u8a);
		return Hasher.sha256(bs, 1, 'hex');
	}
}
const STHC = 10000;
class Cryptor {
	constructor() {}
	static async getKey(pt, saltB64) {
		console.log('getKey salt:' + saltB64 + '/passphraseText:' + pt);
		const digest = await Hasher.sha256(pt, STHC);
		const salt = Base64Util.b64ToU8a(saltB64).buffer;
		console.log('digest:' + digest);
		const keyMaterial = await crypto.subtle.importKey('raw', Base64Util.b64ToU8a(digest), { name: 'PBKDF2' }, false, ['deriveKey']);
		console.log('keyMaterial:' + keyMaterial);
		const key = await crypto.subtle.deriveKey(
			{
				name: 'PBKDF2',
				salt,
				iterations: STHC,
				hash: 'SHA-256',
			},
			keyMaterial,
			{ name: 'AES-GCM', length: 256 },
			false,
			['encrypt', 'decrypt']
		);
		console.log('key:' + key);
		return [key, salt];
	}
	static getFixedField() {
		return crypto.getRandomValues(new Uint8Array(12));
	}
	static getInvocationField() {
		return crypto.getRandomValues(new Uint32Array(1));
	}
	static secureMathRandom() {
		return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
	}
	static async encrypt(pt, dataU8a) {
		const url = location.href.split(/\?#/g)[0];
		const saltB64 = await Hasher.sha512(url + pt);
		const [key, salt] = await Cryptor.getKey(pt, saltB64);
		return await Cryptor.encodeAES256GCM(dataU8a, key, salt);
	}
	static async encodeAES256GCM(inputU8a, key, salt = null) {
		const fixedPart = Cryptor.getFixedField();
		const invocationPart = Cryptor.getInvocationField();
		const iv = Uint8Array.from([...fixedPart, ...new Uint8Array(invocationPart.buffer)]);
		// console.log(key);
		// console.log(iv);
		// console.log('encodeAES256GCM 0 inputU8a:' + inputU8a);
		const encryptedDataAB = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, inputU8a.buffer);
		// console.log('encodeAES256GCM 1 encryptedDataAB:' + encryptedDataAB);
		// console.log('encodeAES256GCM 2 iv' + Base64Util.aToB64u(iv) + '/' + iv.byteLength);
		// console.log('encodeAES256GCM 3 salt' + Base64Util.aToB64u(salt) + '/' + salt.byteLength);
		// console.log('encodeAES256GCM 5 encryptedDataAB:' + Base64Util.aToB64u(encryptedDataAB));
		return [Base64Util.aToB64u(encryptedDataAB), Base64Util.aToB64u(iv.buffer)].join('/');
	}
	static async decrypt(pt, dataD64urls) {
		const url = location.href.split(/\?#/g)[0];
		const saltB64 = await Hasher.sha512(url + pt);
		const [key, salt] = await Cryptor.getKey(pt, saltB64);
		return await Cryptor.decodeAES256GCM(dataD64urls, key, salt);
	}
	static async decodeAES256GCM(dataD64urls, key, salt = null) {
		const [encryptedDataBase64Url, invocationPart] = dataD64urls.split('/');
		// console.log('dataD64urls.length:' + dataD64urls.length);
		// console.log(dataD64urls);
		// console.log(salt);
		// console.log(invocationPart);
		// console.log('encryptedDataBase64Url.length');
		// console.log(encryptedDataBase64Url.length);
		// console.log(encryptedDataBase64Url);
		// console.log('decodeAES256GCM 1 salt:' + salt);
		const iv = new Uint8Array(Base64Util.b64uToAb(invocationPart));
		// console.log(iv);
		// console.log('decodeAES256GCM 2 iv:' + iv);
		const encryptedData = Base64Util.b64uToAb(encryptedDataBase64Url);
		// console.log('decodeAES256GCM 3 encryptedData:' + encryptedData);
		// console.log('decodeAES256GCM 4 key:' + key);
		// console.log('encryptedDataAB_:' + Base64Util.aToB64u(encryptedData));
		// console.log('decodeAES256GCM 6 encryptedData:' + Base64Util.aToB64u(encryptedData));
		let decryptedData = null;
		try {
			decryptedData = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encryptedData);
		} catch (e) {
			console.warn(e);
			return null;
		}
		// console.log('decodeAES256GCM 7 decryptedData:' + decryptedData);
		// console.log('decodeAES256GCM 7 decryptedData:' + Base64Util.aToB64u(decryptedData));
		// console.log('decodeAES256GCM 8 decryptedData:' + decryptedData);
		// console.log('decodeAES256GCM 8 decryptedData:' + Base64Util.u8a2bs(new Uint8Array(decryptedData)));
		return new Uint8Array(decryptedData);
	}
}

const imgRe = /^image\/.+|application\/octet-stream/;
class ImageProcessor {
	constructor() {
		this.canvas = v.ct('canvas', '', '');
		this.ctx = this.canvas.getContext('2d');
		window.onload = () => {
			v.ab(this.canvas);
		};
	}
	createImageData(w, h) {
		return this.ctx.createImageData(w, h);
	}
	async getUriFomBMD(iamgeBitmapData) {
		const w = Math.floor(iamgeBitmapData.width);
		const h = Math.floor(iamgeBitmapData.height);
		this.canvas.setAttribute('width', w);
		this.canvas.setAttribute('height', h);
		let newPaperData = this.ctx.createImageData(w, h);
		const data = iamgeBitmapData.data;
		const len = data.length;
		for (let i = 0; i < len; i++) {
			newPaperData.data[i] = data[i];
		}
		this.ctx.clearRect(0, 0, w, h);
		const newOne1 = this.ctx.getImageData(0, 0, w, h);
		this.ctx.drawImage(await createImageBitmap(newPaperData), 0, 0);
		const newOne = this.ctx.getImageData(0, 0, w, h);
		let dataUri = this.canvas.toDataURL();
		newPaperData = undefined;
		this.loadAbFromPngDataUri(dataUri);
		return dataUri;
	}
	exportImageData(w, h) {
		return this.ctx.getImageData(0, 0, w, h);
	}
	exportPng() {
		return this.canvas.toDataURL();
	}
	exportJpeg(quority = 1.0) {
		return this.canvas.toDataURL('image/jpeg', quority);
	}
	loadAbFromPngDataUri(dUri) {
		return new Promise((resolve, reject) => {
			let imgElm = new Image();
			imgElm.onload = () => {
				const w = imgElm.naturalWidth;
				const h = imgElm.naturalHeight;
				this.ctx.drawImage(imgElm, 0, 0, w, h);
				const idata = this.ctx.getImageData(0, 0, w, h);
				resolve(idata.data.buffer);
			};
			imgElm.src = dUri;
			imgElm.onerror = (e) => {
				console.log('失敗');
				console.error(e);
				reject(e);
			};
			return;
		});
	}
}
const ip = new ImageProcessor();
const COMMA = ',';
const COMMA_I = te.encode(COMMA)[0];
const OPT_PNG = { type: 'image/png' };
class View {
	constructor(tabIds, loadingId) {
		for (let tabId of tabIds) {
			v.ael(tabId, 'click', this.showTab(tabId, tabIds));
		}
		this.loadingElm = v.gid(loadingId);
	}
	showTab(selectTabId, tabIds) {
		const suffix = 'Body';
		const tabIdsWithSuffix = [];
		for (let tabId of tabIds) {
			tabIdsWithSuffix.push(tabId + suffix);
		}
		return () => {
			this.showTabExec(selectTabId, tabIds);
			this.showTabExec(selectTabId + suffix, tabIdsWithSuffix);
		};
	}
	showTabExec(selectTabId, tabIds, prefixis = ['']) {
		for (let prefix of prefixis) {
			const cn = prefix + 'selected';
			for (let tabId of tabIds) {
				if (tabId === selectTabId) {
					continue;
				}
				const elm = v.gid(tabId);
				if (elm.classList.contains(cn)) {
					elm.classList.remove(cn);
				}
			}
			const elmSelected = v.gid(selectTabId);
			elmSelected.classList.add(cn);
		}
	}
	showLoadling() {
		this.loadingElm.classList.add('on');
	}
	heideLoading() {
		this.loadingElm.classList.remove('on');
	}
}
class ImageBuilder {
	constructor(fileId, imageids, sizeId, sizeExpected, pwId, view) {
		this.data = {};
		this.isLoading = false;
		const inputSize = v.gid(sizeId);
		inputSize.value = 900;
		const sizeFunc = (event) => {
			const inputSize = event.target;
			const size = inputSize.value;
			const bits = (size * size * 3 - 3) * 3 - 280;
			const sizeExpectedElm = v.gid(sizeExpected);
			sizeExpectedElm.textContent = '' + bits.toLocaleString() + '';
		};
		sizeFunc({ target: inputSize });
		v.ael(inputSize, 'input', sizeFunc);
		v.ael(fileId, 'change', async (event) => {
			view.showLoadling();
			const { b64d, file } = await FL.l(event);
			if (b64d) {
				this.data[fileId] = b64d;
				const inputSize = v.gid(sizeId);
				const passwd = v.gid(pwId);
				await this.f2is(fileId, imageids, file.name, inputSize.value, passwd.value);
			}
			view.heideLoading();
		});
		for (let imageid of imageids) {
			v.ael(imageid, 'click', async (event) => {
				const imgElm = event.target;
				if (!imgElm.src || !this.fileName) {
					return;
				}
				const no = imageid.split(/[^0-9]/g).join('');
				const fileName = this.fileName + '.' + no + '.png';
				FL.dl(fileName, imgElm.src, null, true);
			});
		}
		this.init(imageids);
	}
	init(imageids) {
		for (let i = 0; i < 4; i++) {
			const imageId = imageids[i];
			const imgElm = v.gid(imageId);
			imgElm.src = '';
		}
	}
	async f2is(fileId, imageids, fileName, size, passwd) {
		const MaxPixcelParImg = isNaN((size + '') * 1) ? 900 : size * 1;
		const MAX_bytes4 = MaxPixcelParImg * MaxPixcelParImg * 4;
		const MAX_bytes3 = MaxPixcelParImg * MaxPixcelParImg * 3;
		const dataUri = this.data[fileId];
		this.fileName = fileName;
		const fnb64 = Base64Util.to64(fileName);
		const [meta, data] = dataUri.split(COMMA);
		const dataE = passwd ? await Cryptor.encrypt(passwd, Base64Util.b64ToU8a(data)) : data;
		console.log('dataE:' + dataE);
		const dataAll = [fnb64, meta, dataE].join(COMMA);
		const len = dataAll.length;
		if (len / 4 > MAX_bytes3 - 4) {
			alert('too fat data! dataSize:' + len + '/allowSize:' + (MAX_bytes3 - 4) * 4 + '/pixcel:' + size);
			return;
		}
		console.log('jast dataSize:' + len + '/allowSize:' + (MAX_bytes3 - 4) * 4 + '/pixcel:' + size);
		const lenWithHole = len + 4 * 4;
		const count = Math.ceil(lenWithHole / MAX_bytes3);
		this.init(imageids);
		const packLen = MAX_bytes3 - 3;
		const promises = [];
		const imageElms = [];
		for (let i = 0; i < count; i++) {
			const imageId = imageids[i];
			imageElms.push(v.gid(imageId));
			const start = i * packLen;
			const end = start + packLen;
			const sub = dataAll.substring(start, end);
			const a = new Uint8ClampedArray(MAX_bytes4);
			a.fill(COMMA_I);
			console.log('sub:' + sub);
			const chars = sub.split('');
			chars.unshift('');
			chars.unshift('');
			chars.unshift('');
			a.set([0, 0, 0, 0]);
			let isCoomad = 0;
			for (let j = 4; j < MAX_bytes4; j++) {
				if (j % 4 === 3) {
					a[j] = 255;
				} else {
					const k = j - Math.floor(j / 4);
					const char = chars[k];
					if (char === undefined) {
						if (isCoomad && isCoomad < 100) {
							a[j] = Math.floor(Math.random() * 126);
							isCoomad++;
						} else if (!isCoomad) {
							isCoomad = 1;
						}
						continue;
					}
					a[j] = te.encode(char);
				}
			}
			promises.push(ip.getUriFomBMD({ data: a, width: MaxPixcelParImg, height: MaxPixcelParImg }));
		}
		const results = await Promise.all(promises);
		for (let duri of results) {
			const imgElm = imageElms.shift();
			imgElm.src = duri;
		}
	}
}
class FileBuilder {
	constructor(fileIds, imageids, buttonId, clearButtonId, pwId, view) {
		this.data = {};
		this.imageids = imageids;
		this.fileIds = fileIds;
		this.isLoading = false;

		for (let i = 0; i < fileIds.length; i++) {
			const id = fileIds[i];
			const imgElm = imageids[i] ? v.gid(imageids[i]) : null;
			v.ael(id, 'change', async (event) => {
				view.showLoadling();
				const { b64d, file } = await FL.l(event);
				this.data[id] = b64d;
				if (imgElm) {
					imgElm.src = b64d;
				}
				view.heideLoading();
			});
		}
		v.ael(buttonId, 'click', async (event) => {
			view.showLoadling();
			try {
				const passwd = v.gid(pwId);
				await this.bfDL(passwd.value);
			} catch (e) {
				console.error(e);
				console.log(e.stack);
			}
			view.heideLoading();
		});
		v.ael(clearButtonId, 'click', async (event) => {
			view.showLoadling();
			await this.clear();
			view.heideLoading();
		});
		this.clear();
	}
	async bfDL(passwd) {
		const u8as = [];
		for (let id of fileIds) {
			const b64d = this.data[id];
			if (!b64d) {
				continue;
			}
			const ab = await ip.loadAbFromPngDataUri(b64d);
			const u8a = new Uint8Array(ab);
			const len = u8a.length;
			const nlen = Math.floor((len / 4) * 3);
			const nU8a = new Uint8Array(nlen);
			for (let i = 0; i < len; i++) {
				if (i % 4 === 3) {
					continue;
				}
				const k = i - Math.floor(i / 4);
				nU8a[k] = u8a[i];
			}
			u8as.push(nU8a.subarray(3));
		}
		const u8a = Base64Util.joinU8as(u8as);
		// const str = Base64Util.u8a2bs(u8a);
		const str = td.decode(u8a);
		const tokens = str.split(',');
		if (tokens.length < 3) {
			alert('invalid data!');
			return null;
		}
		const fnb64 = tokens[0];
		const type = tokens[1];
		const b64 = tokens[2];
		console.log('str:' + str);
		const b64a = passwd ? Base64Util.u8a2b64(await Cryptor.decrypt(passwd, b64)) : b64;
		const dataUri = type + ',' + b64a;
		const fileName = Base64Util.from64(fnb64);
		FL.dl(fileName, dataUri, null, true);
	}
	clear() {
		for (let id of this.fileIds) {
			const elm = v.gid(id);
			elm.value = null;
			this.data[id] = null;
		}
		for (let id of this.imageids) {
			const imgElm = v.gid(id);
			imgElm.src = null;
		}
	}
}
const tabIds = ['toFile', 'toImage'];
const loadingId = 'loading';
const view = new View(tabIds, loadingId);
const fileId = 'FileInput';
const sizeId = 'sizeInput';
const pwId1 = 'pw1';
const sizeExpected = 'sizeExpected';
const outputImageids = ['image1result', 'image2result', 'image3result', 'image4result'];
new ImageBuilder(fileId, outputImageids, sizeId, sizeExpected, pwId1, view);
const fileIds = ['image1File', 'image2File', 'image3File', 'image4File'];
const inputViewImageids = ['image1', 'image2', 'image3', 'image4'];
const buttonId = 'FileOutput';
const pwId2 = 'pw2';
const clearButtonId = 'FileClear';
new FileBuilder(fileIds, inputViewImageids, buttonId, clearButtonId, pwId2, view);
