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
class ProcUtil {
	static sleep(ms) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, ms);
		});
	}
}
const max = 50000;
const RB64Regex = /^[0-9a-zA-Z/\+]+[=]{0,3}$/;
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
		const bs = u8a ? Base64Util.u8a2bs(u8a) : null;
		return bs ? btoa(bs) : null;
	}
	static u8a2b64u(u8a) {
		const b64 = u8a ? Base64Util.u8a2b64(u8a) : null;
		return b64 ? Base64Util.toB64u(b64) : null;
	}
	static s2u8a(s) {
		return te.encode(s);
	}
	static b64uToAb(b) {
		const d = Base64Util.toB64(b);
		return Base64Util.b64ToU8a(d).buffer;
	}
	static u8a2bs(u8a) {
		const r = [];
		for (const e of u8a) {
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
	static isB64(d) {
		return d && typeof d === 'string' && d.length % 4 === 0 && RB64Regex.test(d);
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
	static makeCRCTable() {
		const crcTable = [];
		for (let n = 0; n < 256; n++) {
			let c = n;
			for (let k = 0; k < 8; k++) {
				c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
			}
			crcTable[n] = c;
		}
		return crcTable;
	}
	static crc32(str) {
		const crcTable = Base64Util.makeCRCTable();
		let crc = 0 ^ -1;
		const len = str.length;
		for (let i = 0; i < len; i++) {
			crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xff];
		}
		return (crc ^ -1) >>> 0;
	}
}
const STHC = 10000;
class Cryptor {
	constructor() {}
	static async getKey(pt, saltB64) {
		const digest = await Hasher.sha256(pt, STHC);
		const salt = Base64Util.b64ToU8a(saltB64).buffer;
		const keyMaterial = await crypto.subtle.importKey('raw', Base64Util.b64ToU8a(digest), { name: 'PBKDF2' }, false, ['deriveKey']);
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
		return [key, salt];
	}
	static getFixedField() {
		return crypto.getRandomValues(new Uint8Array(12));
	}
	static getInvocationField() {
		return crypto.getRandomValues(new Uint32Array(1));
	}
	static async encrypt(pt, dataU8a) {
		const url = location.href.split(/\?#/g)[0];
		const saltB64 = await Hasher.sha512(url + pt);
		const [key, salt] = await Cryptor.getKey(pt, saltB64);
		return await Cryptor.encodeAES256GCM(dataU8a, key);
	}
	static async encodeAES256GCM(inputU8a, key) {
		const fixedPart = Cryptor.getFixedField();
		const invocationPart = Cryptor.getInvocationField();
		const iv = Uint8Array.from([...fixedPart, ...new Uint8Array(invocationPart.buffer)]);
		const encryptedDataAB = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, inputU8a.buffer);
		const encryped = [Base64Util.aToB64u(encryptedDataAB), Base64Util.aToB64u(iv.buffer)].join('/');
		return encryped;
	}
	static async decrypt(pt, dataD64urls) {
		const url = location.href.split(/\?#/g)[0];
		const saltB64 = await Hasher.sha512(url + pt);
		const [key, salt] = await Cryptor.getKey(pt, saltB64);
		return await Cryptor.decodeAES256GCM(dataD64urls, key, salt);
	}
	static async decodeAES256GCM(dataD64urls, key) {
		let decryptedData = null;
		try {
			const [encryptedDataBase64Url, invocationPart] = dataD64urls.split('/');
			const iv = new Uint8Array(Base64Util.b64uToAb(invocationPart));
			const encryptedData = Base64Util.b64uToAb(encryptedDataBase64Url);
			decryptedData = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encryptedData);
		} catch (e) {
			console.warn(e);
			return null;
		}
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
		this.pngChunk = this.getPngChunk('sRGB', '\x00') + '$1';
	}
	async getUriFomBMD(iamgeBitmapData, logElm) {
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
		this.ctx.putImageData(newPaperData, 0, 0, 0, 0, w, h);
		// this.ctx.drawImage(await window.createImageBitmap(newPaperData), 0, 0);
		const newOne = this.ctx.getImageData(0, 0, w, h);
		let dataUri = this.canvas.toDataURL();
		newPaperData = undefined;
		this.loadAbFromPngDataUri(dataUri, logElm);
		return dataUri;
	}
	addsRGBProfile(dataUri) {
		const [head, b64] = dataUri.split(',');
		const png = atob(b64);
		// sRGB with Perceptual (0) rendering intent
		const pngChunkAdded = png.replace(/(....IDAT)/, this.pngChunk);
		return head + ',' + btoa(pngChunkAdded);
	}
	getPngChunk(type, data) {
		const LEN_LENGTH = 4;
		const LEN_TYPE = 4;
		const LEN_CRC = 4;
		const lenData = data.length;
		const ab = new ArrayBuffer(LEN_LENGTH + LEN_TYPE + lenData + LEN_CRC);
		const view = new DataView(ab);
		new Uint8Array(ab).fill(0);
		let pos = LEN_LENGTH;
		view.setUint32(0, lenData);
		const lenType = type.length;
		for (let i = 0; i < lenType; i++) {
			view.setUint8(pos++, type.charCodeAt(i));
		}
		for (let i = 0; i < lenData; i++) {
			view.setUint8(pos++, data.charCodeAt(i));
		}
		const crc = Base64Util.crc32(type + data);
		view.setUint32(pos, crc);
		return Base64Util.ab2bs(ab);
	}
	loadAbFromPngDataUri(dUri, logElm) {
		return new Promise(async (resolve, reject) => {
			let imgElm = new Image();
			imgElm.onload = async () => {
				const w = imgElm.naturalWidth;
				const h = imgElm.naturalHeight;
				this.canvas.setAttribute('width', w);
				this.canvas.setAttribute('height', h);
				this.ctx.clearRect(0, 0, w, h);
				this.ctx.drawImage(imgElm, 0, 0);
				const idata = this.ctx.getImageData(0, 0, w, h);
				const ab = idata.data.buffer;
				logElm.textContent = logElm.textContent + '\n' + `loadAbFromPngDataUri 01 w:${w}/h:${h} ${idata} ${ab.byteLength} `;
				resolve(ab);
				this.ctx.clearRect(0, 0, w, h);
				imgElm.onload = null;
				imgElm.onerror = null;
				imgElm.src = null;
				imgElm = null;
			};
			const hash = await Base64Util.sig(Base64Util.dataURI2u8a(dUri));
			logElm.textContent = logElm.textContent + '\n' + `loadAbFromPngDataUri 00 hash:${hash} `;
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
	constructor(fileId, imageids, sizeInputId, sizeExpected, pwId, sigId, sizeId, view, logElmId, redoBtnId, isGrascaleId) {
		this.data = {};
		this.isLoading = false;
		const inputSize = v.gid(sizeInputId);
		const redoBtnElm = v.gid(redoBtnId);
		const logElm = v.gid(logElmId);
		const isGrascaleElm = v.gid(isGrascaleId);
		inputSize.value = 900;
		const sizeFunc = (event) => {
			const inputSize = event.target;
			const size = inputSize.value;
			const mtrix = size * size * 1;
			const bits = (isGrascaleElm.checked ? (mtrix - 2) * 4 : (mtrix * 3 - 3) * 3 - 280) - 17;
			console.log(bits + '/' + mtrix);
			const sizeExpectedElm = v.gid(sizeExpected);
			sizeExpectedElm.textContent = '' + bits.toLocaleString() + '';
		};
		sizeFunc({ target: inputSize });
		v.ael(inputSize, 'input', sizeFunc);
		const funcOnChange = async (event) => {
			view.showLoadling();
			const { b64d, file } = await FL.l(event);
			if (b64d) {
				this.data[fileId] = b64d;
				const inputSize = v.gid(sizeInputId);
				const passwd = v.gid(pwId);
				const u8a = Base64Util.b64ToU8a(b64d.split(',')[1]);
				if (u8a) {
					const sigElm = v.gid(sigId);
					const sizeElm = v.gid(sizeId);
					sigElm.textContent = await Base64Util.sig(u8a);
					sizeElm.textContent = u8a.length.toLocaleString();
				}
				await this.f2is(fileId, imageids, file.name, inputSize.value, passwd.value, logElm, isGrascaleElm.checked);
			}
			view.heideLoading();
		};
		v.ael(isGrascaleId, 'change', () => {
			sizeFunc({ target: inputSize });
		});
		const funcWrapped = async (event) => {
			const evt = event.type === 'change' ? event : this.lastEvent;
			this.lastEvent = evt;
			logElm.textContent = '';
			try {
				await funcOnChange(evt);
			} catch (e) {
				console.log(e);
				logElm.textContent = e ? e + ' \n' + e.stack : e;
				view.heideLoading();
			}
		};
		v.ael(fileId, 'change', funcWrapped);
		v.ael(redoBtnElm, 'click', funcWrapped);
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
	async f2is(fileId, imageids, fileName, size, passwd, logElm, isGrascale = false) {
		const imageElms = [];
		const promises = isGrascale
			? await this.tobeGrayScale(fileId, imageids, fileName, size, passwd, imageElms, logElm)
			: await this.tobeRGB(fileId, imageids, fileName, size, passwd, imageElms, logElm);
		const results = await Promise.all(promises);
		for (let duri of results) {
			const imgElm = imageElms.shift();
			imgElm.src = duri;
		}
	}
	async tobeRGB(fileId, imageids, fileName, size, passwd, imageElms, logElm) {
		const MaxPixcelParImg = isNaN((size + '') * 1) ? 900 : size * 1;
		const MAX_bytes4 = MaxPixcelParImg * MaxPixcelParImg * 4;
		const MAX_bytes3 = MaxPixcelParImg * MaxPixcelParImg * 3;
		const dataUri = this.data[fileId];
		this.fileName = fileName;
		const fnb64 = Base64Util.to64(fileName);
		const [meta, data] = dataUri.split(COMMA);
		const dataE = passwd ? await Cryptor.encrypt(passwd, Base64Util.b64ToU8a(data)) : data;
		const dataAll = [fnb64, meta, dataE].join(COMMA);
		const len = dataAll.length;
		if (len / 4 > MAX_bytes3 - 4) {
			alert('too fat data! dataSize:' + len + '/allowSize:' + (MAX_bytes3 - 4) * 4 + '/pixcel:' + size);
			return;
		}
		console.log('jast dataSize:' + len + '/allowSize:' + (MAX_bytes3 - 4) * 4 + '/pixcel:' + size);
		const lenWithHole = len + 4 * 4;
		this.init(imageids);
		const packLen = MAX_bytes3 - 3;
		const imgCount = Math.ceil(lenWithHole / packLen);
		const promises = [];
		for (let i = 0; i < imgCount; i++) {
			const imageId = imageids[i];
			imageElms.push(v.gid(imageId));
			const start = i * packLen;
			const end = start + packLen;
			const sub = dataAll.substring(start, end);
			const a = new Uint8ClampedArray(MAX_bytes4);
			a.fill(COMMA_I);
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
			promises.push(ip.getUriFomBMD({ data: a, width: MaxPixcelParImg, height: MaxPixcelParImg }, logElm));
		}
		return promises;
	}
	async tobeGrayScale(fileId, imageids, fileName, size, passwd, imageElms, logElm) {
		const MaxPixcelParImg = isNaN((size + '') * 1) ? 900 : size * 1;
		const MAX_pixcelNum = MaxPixcelParImg * MaxPixcelParImg * 1;
		const MAX_bytes4 = MAX_pixcelNum * 4;
		const MAX_bytes2 = MAX_pixcelNum * 2;
		const dataUri = this.data[fileId];
		this.fileName = fileName;
		const fnb64 = Base64Util.to64(fileName);
		const [meta, data] = dataUri.split(COMMA);
		const dataE = passwd ? await Cryptor.encrypt(passwd, Base64Util.b64ToU8a(data)) : data;
		const dataPre = [fnb64, meta].join(COMMA) + ',';
		const u8as = [Base64Util.s2u8a(dataPre)];
		const dataEs = passwd ? dataE.split('/') : [dataE];
		const firstDataE = passwd ? Base64Util.toB64(dataEs[0]) : dataEs[0];
		u8as.push(Base64Util.b64ToU8a(firstDataE));
		if (dataEs.length > 1) {
			u8as.push(Base64Util.b64ToU8a(Base64Util.toB64(dataEs[1])));
		}
		const u8asLen = u8as.length;
		const len = u8as[0].length + u8as[1].length + (u8asLen > 2 ? u8as[2].length : 0) + u8asLen * 3;
		const nu16a = new Uint16Array(len);
		nu16a.fill(0);
		let count = 0;
		for (const u8a of u8as) {
			const lenU8a = u8a.length;
			for (let i = 0; i < lenU8a; i++) {
				nu16a[count + i] = u8a[i];
			}
			count += lenU8a;
			nu16a.set([256], count);
			count += 1;
		}
		const END_TAIL_LEN = 4 * 4;
		const GSMax = (MAX_bytes2 - 8) * 4;
		const Limit = MAX_pixcelNum - 3;
		if (len / 4 > Limit) {
			alert('too fat data! dataSize:' + len + '/allowSize:' + GSMax + '/pixcel:' + size);
			return;
		}
		console.log('jast dataSize:' + len + '/allowSize:' + GSMax + '/pixcel:' + size);
		const lenWithHole = len + END_TAIL_LEN;
		const packLen = MAX_pixcelNum - 4;
		const imgCount = Math.ceil(lenWithHole / packLen);
		this.init(imageids);
		const promises = [];
		for (let i = 0; i < imgCount; i++) {
			const imageId = imageids[i];
			imageElms.push(v.gid(imageId));
			const start = i * packLen;
			const end = start + packLen;
			const sub = nu16a.subarray(start, end);
			const a = new Uint8ClampedArray(MAX_bytes4);
			a.fill(0);
			const initCount = 2;
			for (let j = initCount; j < MAX_pixcelNum; j++) {
				const startIndex = j * 4;
				const mainIndex = j - 2;
				const main = sub[mainIndex];
				if (main === undefined) {
					continue;
				} else if (main === 256) {
					a[startIndex] = 0;
					a[startIndex + 1] = 0;
					a[startIndex + 2] = 0;
					a[startIndex + 3] = 0;
				} else {
					a[startIndex] = main;
					a[startIndex + 1] = main;
					a[startIndex + 2] = main;
					a[startIndex + 3] = 255;
				}
			}
			promises.push(ip.getUriFomBMD({ data: a, width: MaxPixcelParImg, height: MaxPixcelParImg }, logElm));
		}
		return promises;
	}
}
class FileBuilder {
	constructor(fileIds, imageids, buttonId, clearButtonId, pwId, sigId, sizeId, view, logElmId) {
		this.data = {};
		this.imageids = imageids;
		this.fileIds = fileIds;
		this.isLoading = false;
		this.logElm = v.gid(logElmId);

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
			this.logElm.textContent = '';
			try {
				const passwd = v.gid(pwId);
				this.logElm.textContent = this.logElm.textContent + '\n' + '01';
				const result = await this.bfDL(passwd.value, this.logElm);
				if (result) {
					this.logElm.textContent = this.logElm.textContent + '\n' + '02';
					const sigElm = v.gid(sigId);
					const sizeElm = v.gid(sizeId);
					this.logElm.textContent = this.logElm.textContent + '\n' + '03';
					sigElm.textContent = await Base64Util.sig(result);
					this.logElm.textContent = this.logElm.textContent + '\n' + '04';
					sizeElm.textContent = result.length.toLocaleString();
				}
			} catch (e) {
				console.error(e);
				console.log(e.stack);
				this.logElm.textContent = e ? e + ' \n' + e.stack : e;
			}
			const passwd = v.gid(pwId);
			view.heideLoading();
		});
		v.ael(clearButtonId, 'click', async (event) => {
			view.showLoadling();
			await this.clear();
			view.heideLoading();
		});
		this.clear();
	}
	async bfDL(passwd, logElm) {
		const u8as = [];
		let isGrascale = false;
		logElm.textContent = logElm.textContent + '\n' + 'bfDL 01';
		const newMap = {};
		for (const id of fileIds) {
			newMap[id] = JSON.parse(JSON.stringify(this.data[id]));
		}
		for (const id of fileIds) {
			const b64d = newMap[id];
			if (!b64d) {
				continue;
			}
			logElm.textContent = logElm.textContent + '\n' + 'bfDL 01a ' + b64d.substring(b64d.length - 40) + ' ' + b64d.substr(Math.floor(b64d.length / 3), 40) + ' ';
			const ab = await ip.loadAbFromPngDataUri(b64d, logElm);
			const u8a = new Uint8Array(ab);
			let count = 0;
			for (let i = 4; i < 8; i++) {
				count += u8a[i];
			}
			isGrascale = isGrascale || count === 0;
			isGrascale ? this.doAsGS(u8a, u8as, logElm) : this.doAsRGB(u8a, u8as, logElm);
		}

		logElm.textContent = logElm.textContent + '\n' + 'bfDL 02';
		const { fnb64, type, b64 } = isGrascale ? this.finishGS(u8as, logElm) : this.finishRGB(u8as, logElm);
		logElm.textContent = logElm.textContent + '\n' + 'bfDL 06';
		const b64a = passwd ? Base64Util.u8a2b64(await Cryptor.decrypt(passwd, b64)) : b64;
		if (!Base64Util.isB64(b64a)) {
			console.log('b64a:' + b64a);
			alert('invalid data! Crypted Data!');
			return null;
		}
		logElm.textContent = logElm.textContent + '\n' + 'bfDL 07';
		const dataUri = type + ',' + b64a;
		const fileName = Base64Util.from64(fnb64);
		logElm.textContent = logElm.textContent + '\n' + 'bfDL 08';
		FL.dl(fileName, dataUri, null, true);
		return Base64Util.b64ToU8a(b64a);
	}
	doAsRGB(sourceU8a, u8as, logElm) {
		const len = sourceU8a.length;
		const nlen = Math.floor((len / 4) * 3);
		const nU8a = new Uint8Array(nlen);
		const a = [];
		for (let i = 4; i < len; i++) {
			const byte = sourceU8a[i];
			a.push(byte);
			if (i % 4 === 3) {
				continue;
			}
			const k = i - Math.floor(i / 4);
			nU8a[k] = byte;
		}
		const str = td.decode(nU8a);
		const as = a.join(',');
		logElm.textContent = logElm.textContent + '\n' + 'doAsRGB ' + str.substr(Math.floor(0 / 3), 40) + ' ' + as.substr(Math.floor(0 / 3), 40) + ' ';
		u8as.push(nU8a.subarray(3));
	}
	doAsGS(sourceU8a, u8as, logElm) {
		const len = sourceU8a.length;
		const nU8a = new Uint8Array(len);
		const a = [];
		let k = 0;
		let lastK = 0;
		const b = [];
		for (let i = 8; i < len; i++) {
			if (i % 4 !== 1) {
				continue;
			}
			const main = sourceU8a[i]; //main
			const alpha = sourceU8a[i + 2]; //alpha
			if (alpha === 0) {
				lastK !== k ? b.push(nU8a.subarray(lastK, k)) : '';
				lastK = k;
			} else {
				nU8a[k] = main;
				k++;
			}
		}
		console.log('doAsGS sourceU8a len:' + len + '/k:' + k + '/lastK:' + lastK);
		lastK !== k ? b.push(nU8a.subarray(lastK, k)) : '';
		const str = td.decode(nU8a);
		const as = a.join(',');
		logElm.textContent = logElm.textContent + '\n' + 'doAsGS [' + str.substr(Math.floor(0 / 3), 40) + ' ' + as.substr(Math.floor(0 / 3), 40) + '] ';
		u8as.push(b);
	}
	finishRGB(u8as, logElm) {
		const u8a = Base64Util.joinU8as(u8as);
		const str = td.decode(u8a);
		const tokens = str.split(',');
		if (tokens.length < 3) {
			console.log('str:' + str);
			alert('invalid data! Empty!');
			return { fnb64: '', type: '', b64: '' };
		}
		logElm.textContent = logElm.textContent + '\n' + 'finishRGB';
		return { fnb64: tokens.shift(), type: tokens.shift(), b64: tokens.shift() };
	}
	finishGS(u8as, logElm) {
		const nU8as = [[], [], []];
		let index = 0;
		for (const b of u8as) {
			let count = 0;
			for (const ba of b) {
				if (count > 0) {
					index++;
				}
				const current = nU8as[index];
				if (current) {
					current.push(ba);
					count++;
				}
			}
		}
		const u8a = Base64Util.joinU8as(nU8as[0]);
		const str = td.decode(u8a);
		const tokens = str.split(',');
		if (tokens.length < 2) {
			console.log('str:' + str);
			alert('invalid data! Empty!');
			return { fnb64: '', type: '', b64: '' };
		}
		logElm.textContent = logElm.textContent + '\n' + 'finishGS';
		const u8a2 = Base64Util.joinU8as(nU8as[1]);
		const u8a3 = nU8as[2].length > 0 ? (nU8as[2].byteLength ? (nU8as[2].byteLength > 4 ? nU8as[2] : null) : nU8as[2][0].byteLength > 4 ? Base64Util.joinU8as(nU8as[2]) : null) : null;
		return { fnb64: tokens.shift(), type: tokens.shift(), b64: u8a3 ? Base64Util.u8a2b64u(u8a2) + '/' + Base64Util.u8a2b64u(u8a3) : Base64Util.u8a2b64(u8a2) };
	}
	clear() {
		for (let id of this.fileIds) {
			const elm = v.gid(id);
			elm.value = null;
			this.data[id] = null;
		}
		for (let id of this.imageids) {
			const imgElm = v.gid(id);
			imgElm.src = '';
		}
	}
}
class QRCodeManager {
	constructor(urlId, ankerId, ankerId2, qrcodeId, qrcodeDataId) {
		const url = location.href;
		const pathname = location.pathname;
		const hash = location.hash;
		const tweetUrlElm = v.gid(urlId);
		const ankerElm = v.gid(ankerId);
		const anker2Elm = v.gid(ankerId2);
		const qrcodeElm = v.gid(qrcodeId);
		const qrcodeDataElm = v.gid(qrcodeDataId);
		const delimiter = '?a#';
		const qr = new QRCode(qrcodeElm, { height: 1024, width: 1024 });
		const linkFuc = (tweetUrl) => {
			if (tweetUrl.indexOf('https://') === 0) {
				anker2Elm.style.display = 'inline';
				ankerElm.setAttribute('href', tweetUrl);
				anker2Elm.setAttribute('href', tweetUrl);
			} else {
				ankerElm.setAttribute('href', '');
				anker2Elm.setAttribute('href', '');
				anker2Elm.style.display = 'none';
			}
		};
		if (hash) {
			try {
				const pureHash = hash.indexOf('#') > -1 ? hash.split('#')[1] : hash;
				const tweetUrl = Base64Util.from64(Base64Util.toB64u(pureHash));
				linkFuc(tweetUrl);
				tweetUrlElm.value = tweetUrl;
				const nextURL = url.split('#')[0] + delimiter + pureHash;
				qrcodeDataElm.textContent = nextURL + ' size:' + nextURL.length;
				qr.makeCode(nextURL);
			} catch (e) {
				console.warn(e);
			}
		}
		this.now = Date.now();
		const buildFunc = (event) => {
			setTimeout(() => {
				const now = Date.now();
				if (now - this.now < 100) {
					return;
				}
				this.now = now;
				const tweetUrlElm = event.target;
				const tweetUrl = tweetUrlElm.value;
				linkFuc(tweetUrl);
				const nextHash = Base64Util.toB64u(Base64Util.to64(tweetUrl));
				const newPath = pathname + delimiter + nextHash;
				const nextURL = url.split('#')[0] + delimiter + nextHash;
				history.replaceState(null, '', newPath);
				qrcodeDataElm.textContent = nextURL + ' size:' + nextURL.length;
				try {
					qr.makeCode(nextURL);
				} catch (e) {
					console.warn(e);
				}
			}, 10);
		};
		v.ael(tweetUrlElm, 'input', buildFunc);
	}
}
const tabIds = ['toFile', 'toImage', 'QRCode'];
const loadingId = 'loading';
const view = new View(tabIds, loadingId);
const fileId = 'FileInput';
const sizeId = 'sizeInput';
const pwId1 = 'pw1';
const sigId1 = 'sig1';
const sizeId1 = 'size1';
const sizeExpected = 'sizeExpected';
const outputImageids = ['image1result', 'image2result', 'image3result', 'image4result'];
const errorLogsImage = 'errorLogsImage';
const redoBtnId = 'redoButton';
const isGrascaleId = 'isGrascale';
new ImageBuilder(fileId, outputImageids, sizeId, sizeExpected, pwId1, sigId1, sizeId1, view, errorLogsImage, redoBtnId, isGrascaleId);
const fileIds = ['image1File', 'image2File', 'image3File', 'image4File'];
const inputViewImageids = ['image1', 'image2', 'image3', 'image4'];
const buttonId = 'FileOutput';
const pwId2 = 'pw2';
const sigId2 = 'sig2';
const sizeId2 = 'size2';
const clearButtonId = 'FileClear';
const errorLogsFileId = 'errorLogsFile';
new FileBuilder(fileIds, inputViewImageids, buttonId, clearButtonId, pwId2, sigId2, sizeId2, view, errorLogsFileId);
const tweetUrlId = 'tweetUrl';
const anckerId1 = 'ancker1';
const anckerId2 = 'ancker2';
const qrcodeId = 'qrcode';
const qrcodeDataId = 'qrcodeData';
new QRCodeManager(tweetUrlId, anckerId1, anckerId2, qrcodeId, qrcodeDataId);
