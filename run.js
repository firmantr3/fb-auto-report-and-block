const puppeteer = require('puppeteer');

(async () => {
  const endpoint = process.argv.slice(2);
  const browser = await puppeteer.connect({ browserWSEndpoint: endpoint }); // This is where it fails
  const pages = await browser.pages();
  const page = pages[1];
  let stop = false;
  let blockedCount = 0;

  const wordList = [
    `rotan`,
    `kopi`,
    `besar tt`,
    `tt besar`,
    `mengencangkan tt`,
    `cincin terapi`,
    `padat kencang besar`,
    `tetesan`,
    `perangsang`,
    `terangsang`,
    `padat, kencang`
  ];
  const wordListLevel2 = [
    `top`,
    `viral`,
    `murah`,
    `laris`,
    `abadi`,
    `panjang`,
    `kuat`,
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
  ];

  while(!stop) {
    const count = await page.evaluate(({wordList, wordListLevel2}) => {
      const titleElements = document.querySelectorAll(`span.a8c37x1j.ni8dbmo4.stjgntxs.l9j0dhe7`);
      const titlesArray = Array.prototype.slice.call(titleElements);
  
      let counter = 0;
      const titles = new Array;

      titlesArray.forEach((title) => {
        const titleText = String(title.innerText);
        const regexWordlist = new RegExp(wordList.join(`|`), `i`);
        const regexWordlistLevel2 = new RegExp(wordListLevel2.join(`|`), `i`);
        if (!(titleText.match(regexWordlist) && titleText.match(regexWordlistLevel2))) {
          return;
        }
  
        title.id = `to-report-${counter}`;
        counter++;
  
        titles.push(titleText);
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
        window.scrollBy(0, 500);
      });

      const errorMessage = await page.$(`body > div.l9j0dhe7.tkr6xdv7 > div.rq0escxv.l9j0dhe7.du4w35lb > div > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div`);
      if(errorMessage) {
        await page.click(`body > div.l9j0dhe7.tkr6xdv7 > div.rq0escxv.l9j0dhe7.du4w35lb > div > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div > div.gjzvkazv.dati1w0a.f10w8fjw.hv4rvrfc.ecm0bbzt.cbu4d94t.j83agx80.c4hnarmi > div`);
      }

      await page.waitForTimeout(1000);

      continue;
    }
    
    await page.click(`#to-report-0`);

    console.log(`Blocking: "${count.titles[0]}"...`);

    await page.waitForSelector(`div.j83agx80.btwxx1t3.buofh1pr.datstx6m.k4urcfbm.psu0lv52`, {visible: true});
    
    const postMenuSelector = `#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(7) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div.j83agx80.cbu4d94t.h3gjbzrl.l9j0dhe7.du4w35lb.qsy8amke > div.nznu9b0o.ji94ytn4.q10oee1b.r893ighp.ni8dbmo4.stjgntxs.k4urcfbm.spskuzq3.a156tdzh > div > div.cwj9ozl2.j83agx80.cbu4d94t.datstx6m.owwhemhu.ni8dbmo4.stjgntxs.spskuzq3 > div > div.am9z0op8.j83agx80.o387gat7.datstx6m.l9j0dhe7.k4urcfbm.jr1d8bo4.dwxd3oue > div > div.q5bimw55.rpm2j7zs.k7i0oixp.gvuykj2m.j83agx80.cbu4d94t.ni8dbmo4.eg9m0zos.l9j0dhe7.du4w35lb.ofs802cu.pohlnb88.dkue75c7.mb9wzai9.d8ncny3e.buofh1pr.g5gj957u.tgvbjcpo.l56l04vs.r57mb794.kh7kg01d.c3g1iek1.k4xni2cv > div.j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 > div div div.cxmmr5t8 > div > span > div`;
    await page.waitForFunction(({postMenuSelector}) => {
      return document.querySelectorAll(postMenuSelector).length;
    }, {}, {postMenuSelector});

    // menu ...
    await page.evaluate(() => {
      const postMenuSelector = `#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(7) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div.j83agx80.cbu4d94t.h3gjbzrl.l9j0dhe7.du4w35lb.qsy8amke > div.nznu9b0o.ji94ytn4.q10oee1b.r893ighp.ni8dbmo4.stjgntxs.k4urcfbm.spskuzq3.a156tdzh > div > div.cwj9ozl2.j83agx80.cbu4d94t.datstx6m.owwhemhu.ni8dbmo4.stjgntxs.spskuzq3 > div > div.am9z0op8.j83agx80.o387gat7.datstx6m.l9j0dhe7.k4urcfbm.jr1d8bo4.dwxd3oue > div > div.q5bimw55.rpm2j7zs.k7i0oixp.gvuykj2m.j83agx80.cbu4d94t.ni8dbmo4.eg9m0zos.l9j0dhe7.du4w35lb.ofs802cu.pohlnb88.dkue75c7.mb9wzai9.d8ncny3e.buofh1pr.g5gj957u.tgvbjcpo.l56l04vs.r57mb794.kh7kg01d.c3g1iek1.k4xni2cv > div.j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 > div div div.cxmmr5t8 > div > span > div`;
      const postMenus = document.querySelectorAll(postMenuSelector);
      const postMenusArray = Array.prototype.slice.call(postMenus);
      postMenusArray[postMenusArray.length - 1].click();
    })

    // laporkan postingan
    const reportButtonSelector = `#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(7) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(4) > div > div > div.j34wkznp.qp9yad78.pmk7jnqg.kr520xx4 > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div.rq0escxv.jgsskzai.cwj9ozl2.nwpbqux9.ue3kfks5.pw54ja7n.uo3d90p7.l82x9zwi.ni8dbmo4.stjgntxs > div > div.j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 > div > div:nth-child(2)`;
    await page.waitForSelector(reportButtonSelector);
    await page.click(reportButtonSelector);

    // sexual content check
    const sexualContentTagSelector = `#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.i1fnvgqd.gs1a9yip.owycx6da.btwxx1t3.hv4rvrfc.dati1w0a.jb3vyjys.b5q2rw42.lq239pai.mysgfdmx.hddg9phg > div > div > button:nth-child(6)`;
    await page.waitForSelector(sexualContentTagSelector);
    await page.click(sexualContentTagSelector);

    const sendReportButtonSelector = `#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(2) > div > div > div > div > div.ihqw7lf3.i1fnvgqd.j83agx80.opwvks06 > div:nth-child(2) > div > div > div`;
    await page.waitForFunction(({sendReportButtonSelector}) => {
      return document.querySelector(sendReportButtonSelector).ariaDisabled === null;
    }, {}, {sendReportButtonSelector});
    // send
    await page.click(sendReportButtonSelector);

    const blockPosterButtonSelector = `#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div > div:nth-child(3) > div > div > div > div:nth-child(2) > div > div > div`;
    await page.waitForSelector(blockPosterButtonSelector, {visible: true});

    // check block
    await page.click(blockPosterButtonSelector);

    const blockButtonSelector = `#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div > div:nth-child(3) > div > div > div > div:nth-child(2) > div > div > div > div > div.ow4ym5g4.auili1gw.rq0escxv.j83agx80.buofh1pr.g5gj957u.i1fnvgqd.oygrvhab.cxmmr5t8.hcukyx3x.kvgmc6g5.tgvbjcpo.hpfvmrgz.qt6c0cv9.rz4wbd8a.a8nywdso.jb3vyjys.du4w35lb.bp9cbjyn.btwxx1t3.l9j0dhe7 > div > div.j83agx80.cbu4d94t.a9txdygg.fnu23jab.buofh1pr.iuny7tx3.ipjc6fyt > div > div > div:nth-child(1) > div.oajrlxb2.s1i5eluu.gcieejh5.bn081pho.humdl8nn.izx4hr6d.rq0escxv.nhd2j8a9.j83agx80.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.d1544ag0.qt6c0cv9.tw6a2znq.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.l9j0dhe7.abiwlrkh.p8dawk7l.beltcj47.p86d2i9g.aot14ch1.kzx2olss.cbu4d94t.taijpn5t.ni8dbmo4.stjgntxs.k4urcfbm.qypqp5cg`;
    await page.waitForSelector(blockButtonSelector, { visible: true });

    // block
    await page.click(blockButtonSelector);

    const blockedDescriptionSelector = `#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div > div:nth-child(3) > div > div > div > div:nth-child(2) > div > div > div > div`;
    await page.waitForSelector(blockedDescriptionSelector, { visible: true });

    // finish
    await page.waitForSelector(`#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(2) > div > div > div > div > div.ihqw7lf3.i1fnvgqd.j83agx80.opwvks06 > div:nth-child(2) > div > div > div`);
    await page.click(`#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(7) > div > div > div:nth-child(2) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div:nth-child(2) > div > div > div > div > div.ihqw7lf3.i1fnvgqd.j83agx80.opwvks06 > div:nth-child(2) > div > div > div`);

    blockedCount++;
    console.log(`Blocked: "${count.titles[0]}"!`);
    console.log(`Total ${blockedCount} items blocked so far...`);

    await page.reload();
  }

  await browser.disconnect();
})();
