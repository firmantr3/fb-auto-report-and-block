const puppeteer = require('puppeteer');

(async () => {
  const endpoint = process.argv.slice(2);
  const browser = await puppeteer.connect({ browserWSEndpoint: endpoint }); // This is where it fails
  const page = await browser.newPage();
  await page.goto(`https://www.facebook.com/marketplace`, {
    waitUntil: 'networkidle2',
  });
  let stop = false;
  let blockedCount = 0;
  let scrollCount = 0;
  let maxScrollCount = 20;

  const wordList = [
    `[rR]+[0oO]+[tT]+[4aA]+[nN]+`,
    `kopi`,
    `coffee`,
    `besar tt`,
    `tt besar`,
    `mengencangkan tt`,
    `cincin terapi`,
    `padat kencang besar`,
    `tetesan`,
    `perangsang`,
    `terangsang`,
    `padat, kencang`,
    `tetes`,
    `PADAT BERISI DAN KENCANG`,
    `bulat KENCANG`,
    `besar KENCANG`,
    `HASIL TERBUKTI`,
    `LIPSTIK AJAIB`,
    `black jade`,
    `minyaksakti`,
  ];
  const wordListLevel2 = [
    `top`,
    `viral`,
    `murah`,
    `laris`,
    `abadi`,
    `panjang`,
    `[kK]+[uU]+[aA]+[tT]+`,
    `ajaib`,
    `besar`,
    `tahan lama`,
    `hari`,
    `ampuh`,
    `loyo`,
    `ranjang`,
    `manjur`,
    `permanen`,
    `promo`,
    `sakti`,
    `gedhe`,
    `wikwik`,
    `arab`,
    `diskon`,
    `kuda`,
    `tenaga`,
    `semburan`,
    `dewa`,
    `wanita`,
    `[rR]+[0oO]+[tT]+[4aA]+[nN]+ [hH]+[iI]+[tT]+[aA]+[mM]+`,
    `super`,
    `ganas`,
  ];

  while(!stop) {
    const count = await page.evaluate(({wordList, wordListLevel2}) => {
      const titleElements = document.querySelectorAll(`span.a8c37x1j.ni8dbmo4.stjgntxs.l9j0dhe7`);
      const titlesArray = Array.prototype.slice.call(titleElements);
  
      let counter = 0;
      const titles = new Array;

      titlesArray.every((title) => {
        const titleText = String(title.innerText);
        const regexWordlist = new RegExp(wordList.join(`|`), `i`);
        const regexWordlistLevel2 = new RegExp(wordListLevel2.join(`|`), `i`);
        if (
          !(
            titleText.match(regexWordlist) &&
            (
              titleText == regexWordlist ||
              titleText.match(regexWordlistLevel2)
            )
          )
        ) {
          return true;
        }
  
        title.id = `to-report-${counter}`;
        counter++;
  
        titles.push(titleText);

        return false;
      });
  
      return {
        counter,
        titles,
      };
    }, {wordList, wordListLevel2});

    // not found
    if(!count.counter) {
      console.log(`Keyword not found, scrolling...`);

      await page.evaluate(() => {
        window.scrollBy(0, document.body.scrollHeight);
      });

      const errorMessage = await page.$(`body > div.l9j0dhe7.tkr6xdv7 > div.rq0escxv.l9j0dhe7.du4w35lb > div > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div`);
      if(errorMessage) {
        await page.click(`body > div.l9j0dhe7.tkr6xdv7 > div.rq0escxv.l9j0dhe7.du4w35lb > div > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div > div.gjzvkazv.dati1w0a.f10w8fjw.hv4rvrfc.ecm0bbzt.cbu4d94t.j83agx80.c4hnarmi > div`);
      }

      scrollCount++;

      await page.waitForTimeout(1000);

      if(scrollCount > maxScrollCount) {
        scrollCount = 0;
        console.log(`Max scroll count reached, reloading...`);
        await page.reload();
      }

      continue;
    }
    
    try {
      await page.click(`#to-report-0`);
  
      console.log(`Blocking: "${count.titles[0]}"...`);
  
      await page.waitForSelector(`div.j83agx80.buofh1pr.k4urcfbm`, {visible: true});

      const postMenuSelector = `div > div > div:nth-child(1) > div > div:nth-child(7) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div.j83agx80.cbu4d94t.h3gjbzrl.l9j0dhe7.du4w35lb.qsy8amke > div.nznu9b0o.ji94ytn4.q10oee1b.r893ighp.ni8dbmo4.stjgntxs.k4urcfbm.spskuzq3.a156tdzh > div > div.cwj9ozl2.j83agx80.cbu4d94t.datstx6m.owwhemhu.ni8dbmo4.stjgntxs.spskuzq3 > div > div.am9z0op8.j83agx80.o387gat7.datstx6m.l9j0dhe7.k4urcfbm.jr1d8bo4.dwxd3oue > div > div.q5bimw55.rpm2j7zs.k7i0oixp.gvuykj2m.j83agx80.cbu4d94t.ni8dbmo4.eg9m0zos.l9j0dhe7.du4w35lb.ofs802cu.pohlnb88.dkue75c7.mb9wzai9.d8ncny3e.buofh1pr.g5gj957u.tgvbjcpo.l56l04vs.r57mb794.kh7kg01d.c3g1iek1.k4xni2cv.k4urcfbm > div.j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 > div:nth-child(1) > div:nth-child(4) > div > div.cxmmr5t8 > div > span > div`;
      await page.waitForFunction(({ postMenuSelector }) => {
        return document.querySelectorAll(postMenuSelector).length;
      }, {}, { postMenuSelector });

      // menu ...
      await page.evaluate(() => {
        const postMenuSelector = `div > div > div:nth-child(1) > div > div:nth-child(7) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div.j83agx80.cbu4d94t.h3gjbzrl.l9j0dhe7.du4w35lb.qsy8amke > div.nznu9b0o.ji94ytn4.q10oee1b.r893ighp.ni8dbmo4.stjgntxs.k4urcfbm.spskuzq3.a156tdzh > div > div.cwj9ozl2.j83agx80.cbu4d94t.datstx6m.owwhemhu.ni8dbmo4.stjgntxs.spskuzq3 > div > div.am9z0op8.j83agx80.o387gat7.datstx6m.l9j0dhe7.k4urcfbm.jr1d8bo4.dwxd3oue > div > div.q5bimw55.rpm2j7zs.k7i0oixp.gvuykj2m.j83agx80.cbu4d94t.ni8dbmo4.eg9m0zos.l9j0dhe7.du4w35lb.ofs802cu.pohlnb88.dkue75c7.mb9wzai9.d8ncny3e.buofh1pr.g5gj957u.tgvbjcpo.l56l04vs.r57mb794.kh7kg01d.c3g1iek1.k4xni2cv.k4urcfbm > div.j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 > div:nth-child(1) > div:nth-child(4) > div > div.cxmmr5t8 > div > span > div`;
        const postMenus = document.querySelectorAll(postMenuSelector);
        const postMenusArray = Array.prototype.slice.call(postMenus);
        postMenusArray[postMenusArray.length - 1].click();
      })

      // laporkan postingan
      const reportButtonSelector = `div > div > div:nth-child(1) > div > div:nth-child(7) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(4) > div > div > div.j34wkznp.qp9yad78.pmk7jnqg.kr520xx4 > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div.rq0escxv.jgsskzai.cwj9ozl2.nwpbqux9.ue3kfks5.pw54ja7n.uo3d90p7.l82x9zwi.ni8dbmo4.stjgntxs > div > div.j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 > div > div:nth-child(2)`;
      await page.waitForSelector(reportButtonSelector);
      await page.click(reportButtonSelector);

      // sexual content check
      const sexualContentTagSelector = `div > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.i1fnvgqd.gs1a9yip.owycx6da.btwxx1t3.hv4rvrfc.dati1w0a.jb3vyjys.b5q2rw42.lq239pai.mysgfdmx.hddg9phg > div > div > button:nth-child(6)`;
      await page.waitForSelector(sexualContentTagSelector);
      await page.click(sexualContentTagSelector);

      const sendReportButtonSelector = `div > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(2) > div > div > div > div > div.ihqw7lf3.i1fnvgqd.j83agx80.opwvks06 > div:nth-child(2) > div > div > div`;
      await page.waitForFunction(({ sendReportButtonSelector }) => {
        return document.querySelector(sendReportButtonSelector).ariaDisabled === null;
      }, {}, { sendReportButtonSelector });
      // send
      await page.click(sendReportButtonSelector);

      const blockPosterButtonSelector = `div > div > div:nth-child(1) > div > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div > div:nth-child(3) > div > div > div > div:nth-child(2) > div > div > div`;
      await page.waitForSelector(blockPosterButtonSelector, { visible: true });

      // check block
      await page.click(blockPosterButtonSelector);

      const blockButtonSelector = `div > div > div:nth-child(1) > div > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div > div:nth-child(3) > div > div > div > div:nth-child(2) > div > div > div > div > div.ow4ym5g4.auili1gw.rq0escxv.j83agx80.buofh1pr.g5gj957u.i1fnvgqd.oygrvhab.cxmmr5t8.hcukyx3x.kvgmc6g5.tgvbjcpo.hpfvmrgz.qt6c0cv9.rz4wbd8a.a8nywdso.jb3vyjys.du4w35lb.bp9cbjyn.btwxx1t3.l9j0dhe7 > div > div.j83agx80.cbu4d94t.a9txdygg.fnu23jab.buofh1pr.iuny7tx3.ipjc6fyt > div > div > div:nth-child(1)`;
      await page.waitForSelector(blockButtonSelector, { visible: true });

      // block
      await page.click(blockButtonSelector);

      const blockedDescriptionSelector = `div > div > div:nth-child(1) > div > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div > div:nth-child(3) > div > div > div > div:nth-child(2) > div > div > div`;
      await page.waitForSelector(blockedDescriptionSelector, { visible: true });

      // finish
      const finishButtonSelector = `div > div > div:nth-child(1) > div > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div > div > div`;
      await page.waitForSelector(finishButtonSelector);
      await page.click(finishButtonSelector);

      blockedCount++;
      console.log(`Blocked: "${count.titles[0]}"!`);
      console.log(`Total ${blockedCount} items blocked so far...`);
    } catch (error) {
      console.log("Error", error);
    }

    // reset scroll counter
    scrollCount = 0;

    try {
      await page.goto(`https://www.facebook.com/marketplace`, {
        waitUntil: 'networkidle2',
      });
    } catch (error) {
      console.log(error);

      await page.reload();
    }
  }

  await browser.disconnect();
})();
