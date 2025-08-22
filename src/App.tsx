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
    {
      name: '침착맨',
      imageUrl: 'https://yt3.googleusercontent.com/Vaomx_a8Qs9bDHS09zsQBB8BG5rY3LWnvb0zcK4oqThz7oT4PCeZQYyMSsQLGh8pmAwlVAmYew=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 2930000,
    },
    {
      name: '카더정원',
      imageUrl: 'https://yt3.googleusercontent.com/7wgZsN7aqP--_a2sVU9OZYmXZVpAhcsCr8OO8KAeI5Tcv9xUYLGy5H0ObpUgW0hS21cF_sGEjA=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1140000,
    },
    {
      name: '피식대학Psick Univ',
      imageUrl: 'https://yt3.googleusercontent.com/FQ61Pjh2In6lt-nd0o6EtWyCRPIlopBzcm-Pz88CzRXE1gZQ-o1OnV8wL-9IzC4aRr52M6q4z8I=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 2800000,
    },
    {
      name: 'MrBeast',
      imageUrl: 'https://yt3.googleusercontent.com/nxYrc_1_2f77DoBadyxMTmv7ZpRZapHR5jbuYe7PlPd5cIRJxtNNEYyOC0ZsxaDyJJzXrnJiuDE=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 424000000,
    },
    {
      name: '워크맨-Workman',
      imageUrl: 'https://yt3.googleusercontent.com/drHybAWMlHQdHt2VtTJCxo3q6riCxt1EBmEfc_S9xH_nPa4r5_8A6q079B1Mn9z-EfIuMzN3mw=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 4170000,
    },
    {
      name: '엔조이커플enjoycouple',
      imageUrl: 'https://yt3.googleusercontent.com/bgMUfNuZd0Q4Zh5N36NpoVSSnAqEx5KQDENvGjr4YySPyWwb2udOk3ijv1P8lZKL9z1mjqJajA=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 2580000,
    },
    {
      name: '감스트GAMST',
      imageUrl: 'https://yt3.googleusercontent.com/rELiEJEE17me3IkoI2bJFFdMssJ4gPnnNMyUbhj4sHcHdPkm_jeP_tpmMhzSGlo0epoT0R0ZUg=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 2910000,
    },
    {
      name: '피지컬갤러리',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_np_t2ohZ3EtGivS1pR8DBYlZEXe-5sI4NmJH7sq9Jylko=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 3080000,
    },
    {
      name: '노빠꾸탁재훈',
      imageUrl: 'https://yt3.googleusercontent.com/8kj8HO8QIpjNfITdU0eILgyqOHuODUhILPhEKJ-JcpUFMBh7I0uSmA-gcEFI-aIVnkOzVmUvzQ=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1860000,
    },
    {
      name: '꼰대희',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_kvXF8ikeDs5sSIjyl4JuSceqwpAJlslX8ieu5rYmjypA=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1920000,
    },
  ],
  '게임': [
    {
      name: 'LCK',
      imageUrl: 'https://yt3.googleusercontent.com/RErzRqJSsX0DY_IGc2Hj7SDCRpjB4p_ta8H5i4Twj66Jey7JC904Nl3P6cxhW260fqeImBpo=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1610000,
    },
    {
      name: '괴물쥐 유튜브',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_n2j3w7B8DpULUI9Z-GIFO2HVj487vk_hKU9Epsab-Q6qo=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1190000,
    },
    {
      name: '이도원',
      imageUrl: 'https://yt3.googleusercontent.com/Y81c85Xj_HXEXM6aH9RYn2twlj51IGU2uTIJIFGz0EdaxvFHNpTVgSdy0Zy8hKSz9PWzjl_e7u0=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 450000,
    },
    {
      name: '양띵 유튜브',
      imageUrl: 'https://yt3.googleusercontent.com/lSaOJx_bSyAgbKumAM68OLutYoxHcISPDk1Z_WnXK2QOt0Fv7nsYKQjsnEGAMPfIf946sxEW=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1700000,
    },
    {
      name: '혜안',
      imageUrl: 'https://yt3.googleusercontent.com/f7NJo7bEkaGaTeGFkEveKC9aC52HCvaDa6li7v3x_sDdAguKnt880AiF30qB0s_PqSwlTJc4Mg=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 2800000,
    },
    {
      name: '뜨뜨뜨뜨',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_n6164VUQu-JLfxBAuShtMNwo07TubFghcDOq3dTkFaHWTg=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1490000,
    },
    {
      name: '랄로',
      imageUrl: 'https://yt3.googleusercontent.com/Y7S_FlRrIO4uEUgtmlPSR_1lqFE4WuAML-nGkvSaM3IZg6nMdTRaeBht-PB2x35JBXrpyGC_WQ=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1300000,
    },
    {
      name: '우왁굳',
      imageUrl: 'https://yt3.googleusercontent.com/8qJyQpSS6YLADyM5T6afKkpCsGtC3x_4_SSJWTNNO3qKX9FmlRRBZbO7VFy8IegO_717mU7zaqM=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1650000,
    },
    {
      name: 'T1',
      imageUrl: 'https://yt3.googleusercontent.com/KrTYZuIky3flbZ_AKp-uj19CTdUMVIM8jXrM3_1ooAmbzsJTlNkAWvO0Ack6Al79uy--euJTIA=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1580000,
    },
    {
      name: '우주하마',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_m-J9C5Jd0qnjDTXqQ1137-FwYV-ckNNhkbblFuBp65t5Y=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 2130000,
    },
    {
      name: '악동 김블루',
      imageUrl: 'https://yt3.googleusercontent.com/cjzLIxTeDuG1MBi89c9-RFp39BUjpxS65XuvzrwdqLdEQ0HUzAUiMHBvkQMayIYu4App3O9Wkw=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 2140000,
    },
  ],
  '먹방': [
    {
      name: 'tzuyang쯔양',
      imageUrl: 'https://yt3.googleusercontent.com/X33l_vqFwjzDTwlXilfakO6lwf2zz_JjDozCaBHkUS57e2XzE8IjL9v9v_Q4v_my-T5tpt24jA=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 12400000,
    },
    {
      name: '[햄지]Hamzy',
      imageUrl: 'https://yt3.googleusercontent.com/iLXgJAWo5zn0fBY0RgKXkxgTtkzTcDXjgeriRAElnqNm9Zsf7VySgOVq7WNPCJEIxXm266XupQ=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 13800000,
    },
    {
      name: 'Hongyu ASMR 홍유',
      imageUrl: 'https://yt3.googleusercontent.com/s2Llndi5lUM9IAP4bpzCiVtrbuTHQ8rqAaPixulaE2gqM8ljDSp9Phy9ynAt5fA1IZpGPx_jxA=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 16600000,
    },
    {
      name: 'Jane ASMR 제인',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_m_UPPk8SldYo68iRWI2r_e5L-0IgLWYBthGLWASNEX_GY=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 18400000,
    },
    {
      name: '설기양SULGI',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_mujghlCKM2BIbBVJ_gYPD617iJ6RM5oZffWjYBJGGe-_Y=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 15700000,
    },
    {
      name: '문복희 Eat with Boki',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_mTvyQqvy_sv5elJeZB6-6h8EgQFWFHB6Ib_6eBa7sbuYM=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 10600000,
    },
    {
      name: '입짧은햇님',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_n8GWMXO3-vfaHAUr-apAL306G77SNhhqkU4R4xD6boUyk=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1750000,
    },
    {
      name: '히밥heebab',
      imageUrl: 'https://yt3.googleusercontent.com/uk_IsheOt6Jv-SeSCAKIiNR6mcY3Y3gzF5YfjSBQa9Fy_MvGXeXKCf-cFqy5k7POLz6H2OhL=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1690000,
    },
    {
      name: '영국남자 Korean Englishman',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_l3NBOaLOnWVdNU7jOKWzusqmRxIdfsMFDyqugLcRM6dvs=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 6150000,
    },
    {
      name: '상해기SangHyuk',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_loblfEWm2wIo7ajfx1VeSAZhXrHDBWwxgmHQxNisbyw1Y=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1640000,
    },
    {
      name: 'GONGSAM TABLE 이공삼',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_l6JZuD6XU65aVvlI0Wf79qltdvQFvExNwe1XkrYvpBY4A=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 14600000,
    },
  ],
  '뷰티/패션': [
    {
      name: '지냐 Jinyaa',
      imageUrl: 'https://yt3.googleusercontent.com/SCFCGjtwae4li0M1B3mydzu_QvS2-qe0JtKqg2EsMQiOp4OentZIALyDpefxmK1wsKPIs0Vo=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 330000,
    },
    {
      name: 'LeoJ Makeup',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_n_prkAS2s-jB2JHHI7g0tstz6iohY_6qBqQ6lxKra2vYg=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1430000,
    },
    {
      name: 'RISABAE',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_lB8AyOqh_MxT6LcGodOH8flrInTGkPO8KWwrVM5dl7Jhw=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 2610000,
    },
    {
      name: '시네 si-ne',
      imageUrl: 'https://yt3.googleusercontent.com/SXdSzdVxP5O0q5Ymbi_fty7Pc8YGOHsRP9CmFtACHCkL8ZQeSc_w-NYknuVVplDJZV5YQfYB=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 360000,
    },
    {
      name: '톡신TOXIN',
      imageUrl: 'https://yt3.googleusercontent.com/CDLf4X5uNGUflXzex003BAUP89RsgMiI-kibbMuXb3yUxznOhR2jNBGfWIlcrGYg_EQFu2temA=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 200000,
    },
    {
      name: '효진조 Hyojin Cho',
      imageUrl: 'https://yt3.googleusercontent.com/wz3jXQVNHXBMac8bD_qPRLFpBvVfGye3P2HaJesstPC333tqP1iN77sfZyGeFu8qPAlNE4Kk=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1890000,
    },
    {
      name: '콩언니',
      imageUrl: 'https://yt3.googleusercontent.com/XArFEiRcJUO8hgYasmIg6zgzQ0LOqNk-7bapvsB5ETsVkZtqHUGucJngT0XrDgdJfyUUfmj7lU4=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 440000,
    },
    {
      name: 'PONY Syndrome',
      imageUrl: 'https://yt3.googleusercontent.com/KIuukC7yn-HmxrJlLYy0LNwmJLlv3iEwtn6jSP2iFbn6EdXcU9HeO7lSqWF7FTzH3_njUeyjxQ=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 5870000,
    },
    {
      name: 'kiu기우쌤',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_n_q5ESqELSUUy8YohN-Qj0FVABnlcvxAB6wdPvIdAx1dw=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1610000,
    },
    {
      name: '남진 Douyin Makeup',
      imageUrl: 'https://yt3.googleusercontent.com/GwGghK4jMFkuCkuRdFEL1WOF_4MC81Hz2r0ItUSmGhsQFYoKnR2OOXdueP_W0JxPl-LgjsU2_w=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1840000,
    },
  ],
  '연예인Vlog': [
    {
      name: '신세경 sjkuksee',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_msKLPHR2VGmhyx0SZJWKHC_wN-mPhWPHqxPBabNA2s_w=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1450000,
    },
    {
      name: '김종국 GYM JONG KOOK',
      imageUrl: 'https://yt3.googleusercontent.com/dQpGedX7jQIIQ-BJcj3dGroHLb_cY5Mx8bDvmyD-oJO5_NQkR6W5OlsCuqmNrWh3cGq3KvyxmYA=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 3160000,
    },
    {
      name: '걍밍경',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_mieTH2WSE4oBMmczfLHB3HhikzOg1nz9tFD-MLad93Xnw=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1490000,
    },
    {
      name: '유병재',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_ny3_7x7wGswXASawBIme4eazHVZAFR_3Dt-gw6p_zBu9c=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1650000,
    },
    {
      name: '시즌비시즌 Season B Season',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_mu_REdc49DJO0BGmPghKJUufarEWnO1zWPrepb0iE9M2Q=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1740000,
    },
    {
      name: '성시경 SUNG SI KYUNG',
      imageUrl: 'https://yt3.googleusercontent.com/k7vcgjUvUjwwzbWbZ3qDWWzLCXYlNVfNIkMLWfOcDrWiZ8GTka-2tyj6rjUBv3n9Cl1yWo8d=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 2140000,
    },
    {
      name: '혜리',
      imageUrl: 'https://yt3.googleusercontent.com/okeFYw3g3V1v_9hWnSmc1frBSmJAvJAj3DSrRQiVhVFjs07t4tJIh3qRKWeBDPIZmR_96jPjL0k=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 2320000,
    },
    {
      name: '공부왕찐천재 홍진경',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_mXJxSXiJa2E26VH10eCDts0qd7FQszSNbx9tWxpHkD4w=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1770000,
    },
    {
      name: '탱구TV',
      imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_lhOx32_yFLo2olaO5kxrbTNOelggbUWpMLMcmdohFOZA=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1190000,
    },
    {
      name: '박서준 Record PARK\'s',
      imageUrl: 'https://yt3.googleusercontent.com/YBH9YlxKuvCbOgcXdDQic3maAhqqMbzKKqg3UMiY4lHgUERV1JAo69u1hwnymLYIi81hgtRqjQ=s160-c-k-c0x00ffffff-no-rj',
      subscribers: 1930000,
    },
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
    <main className="min-h-screen w-full bg-gradient-to-b from-[#161616] to-[#2D0709] flex justify-center items-center p-4 font-sans">
  {page === 'main' && <MainPage onSelectCategory={handleSelectCategory} />}
  {page === 'game' && <GamePage category={selectedCategory!} onGoMain={handleGoMain} />}
</main>
  );
}
