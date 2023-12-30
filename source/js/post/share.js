/* global KEEP */

function initPostShareHelper() {
  KEEP.utils.postShareHelper = {
    postShareHandle() {
      const pageUrl = window.location.href
      const pageTitle = window.document.title.replace("|", "-")

      const shareContainer = document.querySelector('.post-share-container .share-list-wrap')
      const arbitraryShareDom = document.querySelector('.arbitrary-share')
      const postLang = KEEP.language_post

      // WeChat share
      const wechatShare = shareContainer.querySelector('.wechat')
      wechatShare &&
        wechatShare.setAttribute(
          'data-tooltip-img-url',
          `https://api.qrserver.com/v1/create-qr-code?data=${pageUrl}`
        )

      shareContainer.querySelectorAll('.share-item').forEach((item) => {
        item.addEventListener('click', () => {

          // Telegram
          if (item.classList.contains('telegram')) {
            window.open(
              `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`
            )
          }

          // twitter
          if (item.classList.contains('twitter')) {
            window.open(
              `https://twitter.com/share?url=${pageUrl}&text=${pageTitle}`
            )
          }

          // Arbitrary link copy
          if (item.classList.contains('arbitrary-share')) {
            navigator.clipboard.writeText(pageUrl).then(() => {
              if (arbitraryShareDom) {
                const tooltipDom = arbitraryShareDom.querySelector('.tooltip-content')
                tooltipDom && (tooltipDom.innerHTML = "Copied")
              }
            })
          }
        })
      })

      arbitraryShareDom?.addEventListener('mouseleave', () => {
        setTimeout(() => {
          const tooltipDom = arbitraryShareDom.querySelector('.tooltip-content')
          tooltipDom && (tooltipDom.innerHTML = postLang.share.arbitrary_share)
        }, 500)
      })
    }
  }

  if (KEEP.theme_config.post?.share === true) {
    KEEP.utils.postShareHelper.postShareHandle()
  }
}

if (KEEP.theme_config.pjax?.enable === true && KEEP.utils) {
  initPostShareHelper()
} else {
  window.addEventListener('DOMContentLoaded', initPostShareHelper)
}
