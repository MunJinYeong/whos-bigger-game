import { useState, useEffect, useCallback } from 'react';

// --- 타입 정의 ---
interface Channel {
  name: string;
  imageUrl: string;
  subscribers: number;
}

// YOUTUBE_DATA 객체의 키들을 기반으로 카테고리 타입을 생성
type Category = keyof typeof YOUTUBE_DATA;

// --- 목업 데이터 ---
// 실제 이미지 URL로 교체하여 사용하시면 됩니다.
const YOUTUBE_DATA: Record<string, Channel[]> = {
  '예능/코미디': [
    { name: '피식대학', imageUrl: 'https://placehold.co/400x400/3498DB/FFFFFF?text=Psick_Univ', subscribers: 3370000 },
    { name: '빠더너스', imageUrl: 'https://placehold.co/400x400/E74C3C/FFFFFF?text=BDNS', subscribers: 1470000 },
    { name: '숏박스', imageUrl: 'https://placehold.co/400x400/2ECC71/FFFFFF?text=ShortBox', subscribers: 3050000 },
    { name: '너덜트', imageUrl: 'https://placehold.co/400x400/F1C40F/FFFFFF?text=Nerdult', subscribers: 2790000 },
    { name: '장삐쭈', imageUrl: 'https://placehold.co/400x400/9B59B6/FFFFFF?text=JangBbiJju', subscribers: 3560000 },
    { name: '싱글벙글', imageUrl: 'https://placehold.co/400x400/1ABC9C/FFFFFF?text=SingleBungle', subscribers: 1540000 },
    { name: '빵송국', imageUrl: 'https://placehold.co/400x400/E67E22/FFFFFF?text=BbangSongGuk', subscribers: 1220000 },
    { name: '보물섬', imageUrl: 'https://placehold.co/400x400/34495E/FFFFFF?text=Treasure_Island', subscribers: 1730000 },
    { name: '흔한남매', imageUrl: 'https://placehold.co/400x400/7F8C8D/FFFFFF?text=Heunhan', subscribers: 2600000 },
    { name: '꼰대희', imageUrl: 'https://placehold.co/400x400/D35400/FFFFFF?text=Kkondaehee', subscribers: 1250000 },
  ],
  '게임': [
    { name: 'Faker', imageUrl: 'https://placehold.co/400x400/C0392B/FFFFFF?text=Faker', subscribers: 1980000 },
    { name: '감스트', imageUrl: 'https://placehold.co/400x400/2980B9/FFFFFF?text=Gamst', subscribers: 2360000 },
    { name: '우왁굳', imageUrl: 'https://placehold.co/400x400/27AE60/FFFFFF?text=Woowakgood', subscribers: 1710000 },
    { name: '한동숙', imageUrl: 'https://placehold.co/400x400/F39C12/FFFFFF?text=Handongsuk', subscribers: 720000 },
    { name: '풍월량', imageUrl: 'https://placehold.co/400x400/8E44AD/FFFFFF?text=Poong', subscribers: 570000 },
    { name: '김성태', imageUrl: 'https://placehold.co/400x400/16A085/FFFFFF?text=KimSeongTae', subscribers: 640000 },
    { name: '침착맨', imageUrl: 'https://placehold.co/400x400/D35400/FFFFFF?text=ChimChakMan', subscribers: 2490000 },
    { name: '따효니', imageUrl: 'https://placehold.co/400x400/2C3E50/FFFFFF?text=DDaHyoNi', subscribers: 540000 },
    { name: 'Gamer M', imageUrl: 'https://placehold.co/400x400/7F8C8D/FFFFFF?text=Gamer_M', subscribers: 1100000 },
    { name: 'Gamer N', imageUrl: 'https://placehold.co/400x400/BDC3C7/FFFFFF?text=Gamer_N', subscribers: 980000 },
  ],
  '먹방': [
    { name: 'tzuyang쯔양', imageUrl: 'https://placehold.co/400x400/E74C3C/FFFFFF?text=Tzuyang', subscribers: 9340000 },
    { name: '문복희', imageUrl: 'https://placehold.co/400x400/3498DB/FFFFFF?text=MoonBokhee', subscribers: 9110000 },
    { name: '햄지', imageUrl: 'https://placehold.co/400x400/2ECC71/FFFFFF?text=Hamzy', subscribers: 12500000 },
    { name: '히밥', imageUrl: 'https://placehold.co/400x400/F1C40F/FFFFFF?text=Heebab', subscribers: 1610000 },
    { name: '입짧은햇님', imageUrl: 'https://placehold.co/400x400/9B59B6/FFFFFF?text=Hatnim', subscribers: 1760000 },
    { name: '산적TV 밥굽남', imageUrl: 'https://placehold.co/400x400/1ABC9C/FFFFFF?text=BobGupNam', subscribers: 1300000 },
    { name: '나도', imageUrl: 'https://placehold.co/400x400/E67E22/FFFFFF?text=Nado', subscribers: 2680000 },
    { name: '애주가TV참PD', imageUrl: 'https://placehold.co/400x400/34495E/FFFFFF?text=ChamPD', subscribers: 1210000 },
    { name: '꿀키', imageUrl: 'https://placehold.co/400x400/7F8C8D/FFFFFF?text=Honeykki', subscribers: 2500000 },
    { name: '홍사운드', imageUrl: 'https://placehold.co/400x400/D35400/FFFFFF?text=HONG_SOUND', subscribers: 2000000 },
  ],
  '뷰티/패션': [
    { name: 'PONY Syndrome', imageUrl: 'https://placehold.co/400x400/9B59B6/FFFFFF?text=PONY', subscribers: 5930000 },
    { name: 'RISABAE', imageUrl: 'https://placehold.co/400x400/3498DB/FFFFFF?text=RISABAE', subscribers: 2240000 },
    { name: '회사원A', imageUrl: 'https://placehold.co/400x400/E74C3C/FFFFFF?text=CalaryGirl_A', subscribers: 1200000 },
    { name: 'ssin', imageUrl: 'https://placehold.co/400x400/2ECC71/FFFFFF?text=Ssin', subscribers: 1500000 },
    { name: '조효진', imageUrl: 'https://placehold.co/400x400/F1C40F/FFFFFF?text=HyoJin', subscribers: 1810000 },
    { name: '한별', imageUrl: 'https://placehold.co/400x400/1ABC9C/FFFFFF?text=Hanbyul', subscribers: 910000 },
    { name: '옆집언니 최실장', imageUrl: 'https://placehold.co/400x400/E67E22/FFFFFF?text=ChoiSiljang', subscribers: 840000 },
    { name: '뽐뽐뽐', imageUrl: 'https://placehold.co/400x400/34495E/FFFFFF?text=Bbomx3', subscribers: 820000 },
    { name: '오늘의하늘', imageUrl: 'https://placehold.co/400x400/7F8C8D/FFFFFF?text=Haneul', subscribers: 800000 },
    { name: '소신사장', imageUrl: 'https://placehold.co/400x400/D35400/FFFFFF?text=Sosin', subscribers: 700000 },
  ],
  '연예인Vlog': [
    { name: '백종원', imageUrl: 'https://placehold.co/400x400/27AE60/FFFFFF?text=Baek_JongWon', subscribers: 5800000 },
    { name: '강민경', imageUrl: 'https://placehold.co/400x400/2980B9/FFFFFF?text=Kang_Minkyung', subscribers: 1200000 },
    { name: '신세경', imageUrl: 'https://placehold.co/400x400/C0392B/FFFFFF?text=Shin_Sekyung', subscribers: 1500000 },
    { name: '혜리', imageUrl: 'https://placehold.co/400x400/F39C12/FFFFFF?text=Hyeri', subscribers: 1820000 },
    { name: '솔라시도', imageUrl: 'https://placehold.co/400x400/8E44AD/FFFFFF?text=Solarsido', subscribers: 3440000 },
    { name: '이승기', imageUrl: 'https://placehold.co/400x400/16A085/FFFFFF?text=Lee_SeungGi', subscribers: 1220000 },
    { name: '윤은혜', imageUrl: 'https://placehold.co/400x400/D35400/FFFFFF?text=Yoon_Eunhye', subscribers: 700000 },
    { name: '성시경', imageUrl: 'https://placehold.co/400x400/2C3E50/FFFFFF?text=Sung_Sikyung', subscribers: 1860000 },
    { name: '정은지', imageUrl: 'https://placehold.co/400x400/7F8C8D/FFFFFF?text=Jung_Eunji', subscribers: 800000 },
    { name: '아이유', imageUrl: 'https://placehold.co/400x400/BDC3C7/FFFFFF?text=IU', subscribers: 8900000 },
  ],
};

const CATEGORIES = Object.keys(YOUTUBE_DATA) as Category[];

// --- 컴포넌트 Props 타입 정의 ---
interface ResultModalProps {
  message: string;
  onClose: () => void;
}

interface MainPageProps {
  onSelectCategory: (category: Category) => void;
}

interface GamePageProps {
  category: Category;
  onGoMain: () => void;
}


// --- 컴포넌트 ---

// 모달 컴포넌트
function ResultModal({ message, onClose }: ResultModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 m-4 text-center shadow-2xl transform transition-all scale-100">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">{message}</h2>
        <button
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          확인
        </button>
      </div>
    </div>
  );
}

// 메인 페이지 컴포넌트
function MainPage({ onSelectCategory }: MainPageProps) {
  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-white">Who's Bigger?</h1>
      <p className="text-xl text-gray-300 mb-10">더 많은 구독자를 가진 유튜버를 맞춰보세요!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className="p-6 bg-white bg-opacity-20 text-white text-2xl font-semibold rounded-2xl backdrop-blur-sm border border-white border-opacity-30 shadow-lg hover:bg-opacity-30 transform hover:-translate-y-1 transition-all duration-300"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

// 대결 페이지 컴포넌트
function GamePage({ category, onGoMain }: GamePageProps) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [modalInfo, setModalInfo] = useState({ show: false, message: '' });

  // 새로운 채널 쌍을 랜덤으로 선택하는 함수
  const getNewChannels = useCallback(() => {
    const categoryData = YOUTUBE_DATA[category];
    const firstIndex = Math.floor(Math.random() * categoryData.length);
    let secondIndex;
    do {
      secondIndex = Math.floor(Math.random() * categoryData.length);
    } while (firstIndex === secondIndex);
    
    // 50% 확률로 위치를 바꿈 (항상 큰 쪽이 한쪽에만 있지 않도록)
    if (Math.random() > 0.5) {
        setChannels([categoryData[firstIndex], categoryData[secondIndex]]);
    } else {
        setChannels([categoryData[secondIndex], categoryData[firstIndex]]);
    }
  }, [category]);

  // 컴포넌트 마운트 시 첫 대결 시작
  useEffect(() => {
    getNewChannels();
  }, [getNewChannels]);

  // 구독자 수를 포맷팅하는 함수 (예: 1234567 -> 123만)
  const formatSubscribers = (num: number) => {
    if (num >= 10000) {
      return `${Math.floor(num / 10000)}만`;
    }
    return `${num}`;
  };

  // 다음 라운드를 준비하거나 게임을 종료하는 함수
  const handleNextStep = (isCorrect: boolean) => {
    let currentScore = score;
    let currentStrikes = strikes;

    if (isCorrect) {
      currentScore++;
    } else {
      currentStrikes++;
    }

    // 게임 종료 조건: 2번 연속 성공했거나, 기회를 모두 사용
    const roundNumber = currentScore + currentStrikes;
    if (roundNumber >= 2) {
      let message = '';
      if (currentScore === 2) message = '🎉 2개 성공! 🎉';
      else if (currentScore === 1) message = '👍 1개 성공! 👍';
      else message = '😭 실패! 😭';
      setModalInfo({ show: true, message });
    } else { // 다음 라운드로
      setScore(currentScore);
      setStrikes(currentStrikes);
      setTimeout(() => {
        setIsRevealed(false);
        getNewChannels();
      }, 1000); // 다음 문제 전 잠시 대기
    }
  };

  // 채널 선택 핸들러
  const handleSelect = (selectedIndex: number) => {
    if (isRevealed) return;

    const correctIndex = channels[0].subscribers > channels[1].subscribers ? 0 : 1;
    const isCorrect = selectedIndex === correctIndex;
    
    setIsRevealed(true);

    setTimeout(() => {
      handleNextStep(isCorrect);
    }, 2000); // 2초 후 다음 단계로
  };

  if (channels.length < 2) {
    return <div className="text-white text-2xl">로딩중...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {modalInfo.show && <ResultModal message={modalInfo.message} onClose={onGoMain} />}
      
      <div className="w-full flex justify-between items-center mb-6 px-4">
        <button onClick={onGoMain} className="bg-white bg-opacity-20 text-white py-2 px-4 rounded-lg backdrop-blur-sm border border-white border-opacity-30 hover:bg-opacity-30 transition">
          메인으로
        </button>
        <div className="text-white text-xl font-bold">
            성공: {score} / 실패: {strikes}
        </div>
      </div>

      <div className="relative w-full flex justify-center items-start gap-4 md:gap-8 px-4">
        {/* 채널 1 */}
        <div className="w-1/2 flex flex-col items-center cursor-pointer" onClick={() => handleSelect(0)}>
          <div className="relative w-full aspect-square">
            <img src={channels[0].imageUrl} alt={channels[0].name} className={`w-full h-full object-cover rounded-2xl shadow-2xl transition-opacity duration-500 ${isRevealed ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`absolute inset-0 flex justify-center items-center text-4xl md:text-6xl font-black transition-opacity duration-500 ${isRevealed ? 'opacity-100' : 'opacity-0'} ${channels[0].subscribers > channels[1].subscribers ? 'text-green-400' : 'text-red-400'}`}>
              {formatSubscribers(channels[0].subscribers)}
            </div>
          </div>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white text-center">{channels[0].name}</h2>
        </div>

        {/* 채널 2 */}
        <div className="w-1/2 flex flex-col items-center cursor-pointer" onClick={() => handleSelect(1)}>
          <div className="relative w-full aspect-square">
            <img src={channels[1].imageUrl} alt={channels[1].name} className={`w-full h-full object-cover rounded-2xl shadow-2xl transition-opacity duration-500 ${isRevealed ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`absolute inset-0 flex justify-center items-center text-4xl md:text-6xl font-black transition-opacity duration-500 ${isRevealed ? 'opacity-100' : 'opacity-0'} ${channels[1].subscribers > channels[0].subscribers ? 'text-green-400' : 'text-red-400'}`}>
              {formatSubscribers(channels[1].subscribers)}
            </div>
          </div>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white text-center">{channels[1].name}</h2>
        </div>
      </div>
      <div className="mt-8 text-3xl font-bold text-white">VS</div>
    </div>
  );
}

// 메인 App 컴포넌트
export default function App() {
  const [page, setPage] = useState('main'); // 'main' or 'game'
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setPage('game');
  };

  const handleGoMain = () => {
    setSelectedCategory(null);
    setPage('main');
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-800 via-slate-900 to-black flex justify-center items-center p-4 font-sans">
      {page === 'main' && <MainPage onSelectCategory={handleSelectCategory} />}
      {page === 'game' && <GamePage category={selectedCategory!} onGoMain={handleGoMain} />}
    </main>
  );
}
