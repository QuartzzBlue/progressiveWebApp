/* https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle?hl=ko  */

const sCacheName = 'hello-pwa'; //캐시 제목 선언
const aFileToCache = '.'; //캐시할 파일 선언
const aFilesToCache = [ //캐시할 파일 선언
    './index.html', '.manifest.json', './images/hello-pwa.png'
];

//'install' 이벤트는 서비스 워커가 받는 첫 번째 이벤트이며 한 번만 발생
//클라이언트를 제어하기 전에 필요한 파일을 캐시할 수 있는 기회
self.addEventListener('install', pEvent => {
    console.info('서비스 워커 설치');
    //'installEvent.waitUntil()' 에 전달된 프라미스는 설치 기간과 설치 성공 또는 실패를 알림
    pEvent.waitUntil(
        caches.open(sCacheName)
            .then(pCache => {
                console.lof('파일 캐시 저장');
                pCache.add(aFileToCache);
                pCache.addAll(aFilesToCache);
            })
    );
});

//서비스 워커는 설치가 완료된 후 '활성화(activate)'될 때까지 fetch 및 push와 같은 이벤트를 수신하지 않음
//활성화 시점에서 push 및 sync와 같은 함수 이벤트를 처리
self.addEventListener('activate', pEvent => {
    console.log('서비스 워커 동작 시작');
});

self.addEventListener('fetch', pEvent => {
    pEvent.respondWith( //결과값이 준비될 때까지 네트워크 요청을 일시 정지
        caches.match(pEvent.request)
    )
});

