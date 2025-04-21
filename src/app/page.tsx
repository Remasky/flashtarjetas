"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area"

interface Flashcard {
  id: number;
  polish: string;
  spanish: string;
  gotIt: boolean;
}

// Kategoria 1: Społeczeństwo, Praca i Pojęcia Abstrakcyjne
const spoleczenstwoPracaPojeciaFlashcards: Flashcard[] = [
    { id: 3, polish: 'opowiadać', spanish: 'narrar, contar', gotIt: false },
    { id: 4, polish: 'odciążać', spanish: 'aliviar', gotIt: false },
    { id: 8, polish: 'należeć', spanish: 'pertenecer', gotIt: false }, // Duplikat ID 16
    { id: 13, polish: 'płatność z góry', spanish: 'pago por adelantado', gotIt: false },
    { id: 16, polish: 'należeć', spanish: 'pertenecer', gotIt: false }, // Duplikat ID 8
    { id: 18, polish: 'pieczątka', spanish: 'el sello', gotIt: false },
    { id: 19, polish: 'gościć', spanish: 'acoger', gotIt: false },
    { id: 20, polish: 'zagrożenie', spanish: 'la amenaza', gotIt: false },
    { id: 21, polish: 'odbywać służbę wojskową', spanish: 'hacer la mili', gotIt: false },
    { id: 24, polish: 'myśliwy', spanish: 'el cazador', gotIt: false },
    { id: 26, polish: 'ubezpieczenie', spanish: 'el seguro', gotIt: false },
    { id: 27, polish: 'budżet', spanish: 'el presupuesto', gotIt: false },
    { id: 30, polish: 'właściciel', spanish: 'el dueño', gotIt: false },
    { id: 32, polish: 'odliczanie', spanish: 'cuenta atrás', gotIt: false },
    { id: 33, polish: 'kosztować dużo wysiłku', spanish: 'costarme', gotIt: false },
    { id: 34, polish: 'pokonać', spanish: 'superar, vencer', gotIt: false },
    { id: 36, polish: 'zapisany', spanish: 'inscrito', gotIt: false },
    { id: 40, polish: 'podejrzewać', spanish: 'sospechar', gotIt: false },
    { id: 43, polish: 'konferencja', spanish: 'la conferencia', gotIt: false },
    { id: 44, polish: 'uczestnik', spanish: 'el participante', gotIt: false },
    { id: 45, polish: 'cud', spanish: 'el milagro', gotIt: false },
    { id: 63, polish: 'zazdrościć', spanish: 'envidiar', gotIt: false },
    { id: 74, polish: 'przymiotnik', spanish: 'el adjetivo', gotIt: false },
    { id: 75, polish: 'czasownik', spanish: 'el verbo', gotIt: false },
    { id: 76, polish: 'rzeczownik', spanish: 'el sustantivo', gotIt: false },
    { id: 77, polish: 'pogrzeb', spanish: 'el entierro', gotIt: false },
    { id: 79, polish: 'żałoba', spanish: 'el luto', gotIt: false },
    { id: 91, polish: 'premiera', spanish: 'el estreno', gotIt: false },
    { id: 92, polish: 'okładka', spanish: 'la portada', gotIt: false }, // Może być też w Miejsca/Technologia (książka)
    { id: 93, polish: 'spis treści', spanish: 'el índice', gotIt: false }, // Może być też w Miejsca/Technologia (książka)
    { id: 101, polish: 'olimpiada', spanish: 'la olimpiada, juegos Olímpicos', gotIt: false },
    { id: 102, polish: 'medal', spanish: 'la medalla', gotIt: false },
    { id: 103, polish: 'zawody', spanish: 'la competencia', gotIt: false },
    { id: 104, polish: 'pochodnia', spanish: 'la antorcha', gotIt: false }, // Powiązane z Olimpiadą
    { id: 105, polish: 'ceremonia otwarcia', spanish: 'la ceremonia de apertura', gotIt: false },
    { id: 106, polish: 'ostrzegać', spanish: 'avisar', gotIt: false },
    { id: 113, polish: 'podanie', spanish: 'la solicitud', gotIt: false }, // np. o pracę
    { id: 114, polish: 'wymagania', spanish: 'los requisitos', gotIt: false },
    { id: 120, polish: 'poseł', spanish: 'el diputado', gotIt: false },
    { id: 121, polish: 'przemówienie', spanish: 'el discurso', gotIt: false },
    { id: 124, polish: 'oferta pracy', spanish: 'la oferta de trabajo', gotIt: false },
    { id: 125, polish: 'umiejętności', spanish: 'los habilidades', gotIt: false },
    { id: 126, polish: 'przywództwo', spanish: 'el liderazgo', gotIt: false },
    { id: 127, polish: 'karta do głosowania', spanish: 'la boleta', gotIt: false },
    { id: 130, polish: 'kibic', spanish: 'el aficionado', gotIt: false }, // Powiązane ze sportem, ale też rola społeczna
    { id: 132, polish: 'przemyt', spanish: 'el contrabando', gotIt: false },
    { id: 133, polish: 'urząd celny', spanish: 'la aduana', gotIt: false },
    { id: 134, polish: 'subskrybent', spanish: 'el suscriptor', gotIt: false },
    { id: 135, polish: 'wyświetlenia', spanish: 'los visualizaciones', gotIt: false }, // Media społecznościowe/praca
    { id: 148, polish: 'nadawca', spanish: 'el remitente', gotIt: false },
    { id: 149, polish: 'trasa koncertowa', spanish: 'la gira', gotIt: false }, // Wydarzenie społeczne/praca
    { id: 157, polish: 'platforma', spanish: 'plataforma', gotIt: false }, // Często w kontekście pracy/technologii
    { id: 159, polish: 'błagać', spanish: 'mendigar', gotIt: false },
    { id: 163, polish: 'wydajność', spanish: 'el rendimiento', gotIt: false },
    { id: 166, polish: 'stanowisko', spanish: 'el puesto', gotIt: false },
    { id: 167, polish: 'udawać', spanish: 'fingir', gotIt: false },
    { id: 168, polish: 'strajk', spanish: 'la huelga', gotIt: false },
    { id: 169, polish: 'zgadywać', spanish: 'adivinar', gotIt: false },
    { id: 170, polish: 'zamiennik', spanish: 'el sustituto', gotIt: false },
  ]; // ~59 pozycji

// Kategoria 2: Technologia, Transport i Miejsca
const technologiaTransportMiejscaFlashcards: Flashcard[] = [
    { id: 6, polish: 'witryna sklepowa', spanish: 'el escaparate/la vidriera', gotIt: false },
    { id: 7, polish: 'dzwonek do drzwi', spanish: 'el timbre', gotIt: false },
    { id: 9, polish: 'food truck', spanish: 'el camión de comida', gotIt: false }, // Transport + Jedzenie, tu jako pojazd
    { id: 15, polish: 'klimatyzacja', spanish: 'el aire acondicionado', gotIt: false },
    { id: 17, polish: 'hulajnoga elektryczna', spanish: 'el patinete eléctrico', gotIt: false },
    { id: 22, polish: 'wokół', spanish: 'alrededor', gotIt: false }, // Określenie miejsca
    { id: 23, polish: 'ognisko', spanish: 'la fogata', gotIt: false },
    { id: 25, polish: 'kliknięcie', spanish: 'el clic', gotIt: false },
    { id: 31, polish: 'grad', spanish: 'el granizo', gotIt: false }, // Zjawisko pogodowe/natura
    { id: 35, polish: 'skrzydło', spanish: 'el ala', gotIt: false }, // Część samolotu/zwierzęcia
    { id: 41, polish: 'wsiadać/wysiadać', spanish: 'subir/bajar', gotIt: false }, // Transport
    { id: 42, polish: 'peron', spanish: 'el anden', gotIt: false },
    { id: 64, polish: 'brzeg', spanish: 'la orilla', gotIt: false },
    { id: 65, polish: 'mgła', spanish: 'la niebla', gotIt: false }, // Zjawisko pogodowe/natura
    { id: 66, polish: 'krajobraz', spanish: 'el paisaje', gotIt: false },
    { id: 70, polish: 'mur zamku', spanish: 'la muralla', gotIt: false }, // Duplikat ID 100
    { id: 71, polish: 'wieża', spanish: 'el torre', gotIt: false },
    { id: 72, polish: 'forteca', spanish: 'la fortaleza', gotIt: false },
    { id: 78, polish: 'cmentarz', spanish: 'el cementerio', gotIt: false }, // Miejsce
    { id: 80, polish: 'drukarka', spanish: 'la impresora', gotIt: false },
    { id: 81, polish: 'scena koncertów', spanish: 'el escenario', gotIt: false }, // Miejsce, duplikat ID 150
    { id: 82, polish: 'perkusja', spanish: 'la batería', gotIt: false }, // Instrument, obiekt
    { id: 83, polish: 'maska samochodu', spanish: 'el capó', gotIt: false },
    { id: 84, polish: 'kierownica', spanish: 'el volante', gotIt: false },
    { id: 85, polish: 'silnik', spanish: 'el motor', gotIt: false },
    { id: 86, polish: 'hamulec', spanish: 'el freno', gotIt: false },
    { id: 99, polish: 'zaułek', spanish: 'el callejón', gotIt: false },
    { id: 100, polish: 'mur obronny', spanish: 'la muralla', gotIt: false }, // Duplikat ID 70
    { id: 107, polish: 'prognoza', spanish: 'el pronóstico', gotIt: false }, // Pogoda/Natura
    { id: 108, polish: 'tęcza', spanish: 'el arcoiris', gotIt: false }, // Pogoda/Natura
    { id: 109, polish: 'tankować', spanish: 'repostar el coche', gotIt: false },
    { id: 110, polish: 'stacja benzynowa', spanish: 'la gasolinera', gotIt: false },
    { id: 111, polish: 'paliwo', spanish: 'el combustible', gotIt: false },
    { id: 112, polish: 'napełniać', spanish: 'llenar', gotIt: false }, // W kontekście np. baku
    { id: 119, polish: 'stolik nocny', spanish: 'la mesita de noche', gotIt: false }, // Mebel/obiekt
    { id: 137, polish: 'szlak', spanish: 'el sendero', gotIt: false },
    { id: 138, polish: 'wodospad', spanish: 'la cascada', gotIt: false },
    { id: 140, polish: 'wentylator', spanish: 'el ventilador', gotIt: false },
    { id: 141, polish: 'cień', spanish: 'la sombra', gotIt: false }, // Związane z miejscem/naturą
    { id: 142, polish: 'ograniczenie prędkości', spanish: 'el limite de velocidad', gotIt: false },
    { id: 143, polish: 'punkt poboru opłat', spanish: 'el peaje', gotIt: false },
    { id: 144, polish: 'rozbić się', spanish: 'estrellarse', gotIt: false }, // Transport
    { id: 145, polish: 'duch', spanish: 'el fantasma, el espíritu', gotIt: false }, // Istota nadprzyrodzona, często związana z miejscem
    { id: 146, polish: 'powiększać', spanish: 'alargar', gotIt: false }, // W kontekście obiektów/przestrzeni
    { id: 147, polish: 'pasować', spanish: 'caber', gotIt: false }, // W kontekście obiektów/przestrzeni
    { id: 150, polish: 'scena', spanish: 'el escenario', gotIt: false }, // Miejsce, duplikat ID 81
    { id: 156, polish: 'plik', spanish: 'el archivo', gotIt: false },
    { id: 160, polish: 'grób', spanish: 'la tumba', gotIt: false }, // Miejsce
    { id: 161, polish: 'płonąć', spanish: 'arder', gotIt: false }, // W kontekście ogniska/pożaru miejsca
    { id: 162, polish: 'słuchawki', spanish: 'los auriculares', gotIt: false },
]; // ~53 pozycje

// Kategoria 3: Dom, Jedzenie, Cechy i Czas Wolny
const domJedzenieCzasWolnyFlashcards: Flashcard[] = [
    { id: 5, polish: 'guma do żucia', spanish: 'el chicle', gotIt: false },
    { id: 10, polish: 'z dostawą', spanish: 'a domicilio', gotIt: false }, // Związane z jedzeniem/domem
    { id: 11, polish: 'słony', spanish: 'salado', gotIt: false }, // Cecha/Jedzenie
    { id: 12, polish: 'przyprawy', spanish: 'los condimentos', gotIt: false },
    { id: 14, polish: 'okrągły', spanish: 'redondo', gotIt: false }, // Cecha
    { id: 28, polish: 'podlewać', spanish: 'regar', gotIt: false }, // Dom/Ogród
    { id: 29, polish: 'dziki (zwierzę)', spanish: 'salvaje', gotIt: false }, // Cecha/Zwierzę
    { id: 37, polish: 'pianka', spanish: 'la espuma', gotIt: false }, // Może być jedzenie lub materiał
    { id: 38, polish: 'prażyć, piec', spanish: 'tostar', gotIt: false },
    { id: 39, polish: 'nieudany', spanish: 'fallido', gotIt: false }, // Cecha
    { id: 46, polish: 'mocny', spanish: 'potente', gotIt: false }, // Cecha
    { id: 47, polish: 'sportowy', spanish: 'deportivo', gotIt: false }, // Cecha/Czas wolny
    { id: 48, polish: 'wytrzymały', spanish: 'resistente', gotIt: false }, // Cecha
    { id: 49, polish: 'okulary do pływania', spanish: 'las gafas de natación', gotIt: false }, // Sport/Czas wolny
    { id: 50, polish: 'chlor', spanish: 'el cloro', gotIt: false }, // Związane z basenem/pływaniem
    { id: 51, polish: 'intensywnie', spanish: 'intensivamente', gotIt: false }, // Określenie (przysłówek)
    { id: 52, polish: 'smaczny', spanish: 'sabroso', gotIt: false }, // Cecha/Jedzenie
    { id: 53, polish: 'radosny', spanish: 'alegre', gotIt: false }, // Cecha
    { id: 54, polish: 'zatłoczony', spanish: 'concurrido', gotIt: false }, // Cecha (miejsca, ale opis)
    { id: 55, polish: 'odległy', spanish: 'lejano', gotIt: false }, // Cecha (miejsca, ale opis)
    { id: 56, polish: 'relaksujący', spanish: 'relajante', gotIt: false }, // Cecha/Czas wolny
    { id: 57, polish: 'niezapomniany', spanish: 'inolvidable', gotIt: false }, // Cecha
    { id: 58, polish: 'ryzykowny', spanish: 'arriesgado', gotIt: false }, // Cecha
    { id: 59, polish: 'cichy', spanish: 'silencioso', gotIt: false }, // Cecha
    { id: 60, polish: 'zorganizowany', spanish: 'organizado', gotIt: false }, // Cecha
    { id: 61, polish: 'stresujący', spanish: 'estresante', gotIt: false }, // Cecha
    { id: 62, polish: 'konkurencyjny', spanish: 'competitivo', gotIt: false }, // Cecha/Sport
    { id: 67, polish: 'ciężary', spanish: 'las pesas', gotIt: false }, // Sport/Czas wolny
    { id: 68, polish: 'brzuszki', spanish: 'las abdominales', gotIt: false }, // Sport/Czas wolny
    { id: 69, polish: 'rozciąganie', spanish: 'el estiramiento', gotIt: false }, // Sport/Czas wolny
    { id: 73, polish: 'łucznik', spanish: 'el arquero', gotIt: false }, // Sport/Hobby/Rola
    { id: 87, polish: 'mąka', spanish: 'la harina', gotIt: false },
    { id: 88, polish: 'kromka', spanish: 'la rebanada', gotIt: false },
    { id: 89, polish: 'chleb pełnoziarnisty', spanish: 'el pan integral', gotIt: false },
    { id: 90, polish: 'mięta', spanish: 'la menta', gotIt: false },
    { id: 94, polish: 'szaszłyk', spanish: 'la brocheta', gotIt: false },
    { id: 95, polish: 'pieczeń, grillowane mięso', spanish: 'el asado', gotIt: false },
    { id: 96, polish: 'stek', spanish: 'el churrasco', gotIt: false },
    { id: 97, polish: 'wędzony', spanish: 'ahumado', gotIt: false }, // Cecha/Jedzenie
    { id: 98, polish: 'osoba obsługująca grill', spanish: 'el parrillero', gotIt: false }, // Czas wolny/Rola
    { id: 115, polish: 'mielenie', spanish: 'molienda', gotIt: false }, // Jedzenie
    { id: 116, polish: 'kawa z odrobiną mleka', spanish: 'cortado', gotIt: false }, // Jedzenie/Picie
    { id: 117, polish: 'palenie kawy', spanish: 'torrefacción', gotIt: false }, // Jedzenie
    { id: 118, polish: 'pościel', spanish: 'la ropa de cama', gotIt: false }, // Dom
    { id: 122, polish: 'podanie', spanish: 'el pase', gotIt: false }, // Sport
    { id: 123, polish: 'strzał', spanish: 'el tiro', gotIt: false }, // Sport/Broń
    { id: 128, polish: 'kaczka', spanish: 'un pato', gotIt: false }, // Zwierzę
    { id: 129, polish: 'wiejski', spanish: 'rural', gotIt: false }, // Cecha (miejsca, ale opis)
    { id: 131, polish: 'strzelać na bramkę', spanish: 'disparar/tirar a puerta', gotIt: false }, // Sport
    { id: 136, polish: 'krem przeciwsłoneczny', spanish: 'la crema solar', gotIt: false }, // Czas wolny/Kosmetyk
    { id: 139, polish: 'pot', spanish: 'el sudor', gotIt: false }, // Ciało/Wysiłek fizyczny
    { id: 151, polish: 'schronisko', spanish: 'el refugio de animales', gotIt: false }, // Zwierzęta
    { id: 152, polish: 'kość', spanish: 'el hueso', gotIt: false }, // Zwierzęta/Ciało
    { id: 153, polish: 'obroża', spanish: 'el collar', gotIt: false }, // Zwierzęta
    { id: 154, polish: 'szczeniak', spanish: 'el cachorro', gotIt: false }, // Zwierzęta
    { id: 155, polish: 'smycz', spanish: 'la correa', gotIt: false }, // Zwierzęta
    { id: 158, polish: 'szermierka', spanish: 'la esgrima', gotIt: false }, // Sport/Czas wolny
    { id: 164, polish: 'jestem zmotywowany', spanish: 'estoy arriba', gotIt: false }, // Stan/Cecha
    { id: 165, polish: 'mózg', spanish: 'el cerebro', gotIt: false }, // Ciało
]; // ~58 pozycji

const initialFlashcards = spoleczenstwoPracaPojeciaFlashcards;

const secondFlashcards = technologiaTransportMiejscaFlashcards;

const thirdFlashcards = domJedzenieCzasWolnyFlashcards;

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Home() {
  const [selectedSet, setSelectedSet] = useState<'spoleczenstwoPracaPojecia' | 'technologiaTransportMiejsca' | 'domJedzenieCzasWolny'>('spoleczenstwoPracaPojecia');
  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [languageSide, setLanguageSide] = useState<'polish' | 'spanish'>('polish');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [openAllWords, setOpenAllWords] = useState(false);

  useEffect(() => {
      const savedSet = localStorage.getItem('selectedSet') as 'spoleczenstwoPracaPojecia' | 'technologiaTransportMiejsca' | 'domJedzenieCzasWolny' | null;
      if (savedSet) {
          setSelectedSet(savedSet as 'spoleczenstwoPracaPojecia' | 'technologiaTransportMiejsca' | 'domJedzenieCzasWolny');
      }
  }, []);

  useEffect(() => {
      localStorage.setItem('selectedSet', selectedSet);
      switch (selectedSet) {
        case 'spoleczenstwoPracaPojecia':
            setFlashcards(spoleczenstwoPracaPojeciaFlashcards);
            break;
        case 'technologiaTransportMiejsca':
            setFlashcards(technologiaTransportMiejscaFlashcards);
            break;
        case 'domJedzenieCzasWolny':
            setFlashcards(domJedzenieCzasWolnyFlashcards);
            break;
        default:
            setFlashcards(spoleczenstwoPracaPojeciaFlashcards);
    }
      setCurrentCardIndex(0);
      setIsFlipped(false);
  }, [selectedSet]);

  useEffect(() => {
    const savedState = localStorage.getItem(`flashcardState_${selectedSet}`);
    const savedIndex = localStorage.getItem(`currentCardIndex_${selectedSet}`);
    if (savedState) {
      setFlashcards(JSON.parse(savedState));
    }
    if (savedIndex) {
      setCurrentCardIndex(parseInt(savedIndex, 10));
    }
  }, [selectedSet]);

  useEffect(() => {
    localStorage.setItem(`flashcardState_${selectedSet}`, JSON.stringify(flashcards));
    localStorage.setItem(`currentCardIndex_${selectedSet}`, currentCardIndex.toString());
  }, [flashcards, currentCardIndex, selectedSet]);

  const markAsGotIt = () => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[currentCardIndex].gotIt = true;
    setFlashcards(updatedFlashcards);
    goToNextCard();
  };

  const markAsDontKnow = () => {
    goToNextCard();
  };

    const goToNextCard = () => {
        let nextIndex = currentCardIndex;

        if (isRandom) {
            const remainingCards = flashcards.filter(card => !card.gotIt);
            if (remainingCards.length === 0) {
                return;
            }

            let unlearnedIndices = flashcards
                .map((card, index) => (!card.gotIt ? index : -1))
                .filter(index => index !== -1);

            if (unlearnedIndices.length === 0) {
                return;
            }

            if (unlearnedIndices.length > 1) {
                do {
                    nextIndex = unlearnedIndices[Math.floor(Math.random() * unlearnedIndices.length)];
                } while (nextIndex === currentCardIndex);
            } else {
                nextIndex = unlearnedIndices[0];
            }
        } else {
            let nextIndexCalculated = false;
            for (let i = 1; i <= flashcards.length; i++) {
                let tempIndex = (currentCardIndex + i) % flashcards.length;
                if (!flashcards[tempIndex].gotIt) {
                    nextIndex = tempIndex;
                    nextIndexCalculated = true;
                    break;
                }
            }
            if (!nextIndexCalculated) {
                return;
            }
        }

        setCurrentCardIndex(nextIndex);
        setIsFlipped(false);
    };


  const resetProgress = () => {
    const resetFlashcards = flashcards.map(card => ({ ...card, gotIt: false }));
    setFlashcards(resetFlashcards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const remainingCardsCount = flashcards.filter(card => !card.gotIt).length;
  const currentCard = flashcards[currentCardIndex];

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const displayedWord = isFlipped
    ? languageSide === 'polish'
      ? currentCard.spanish
      : currentCard.polish
    : languageSide === 'polish'
      ? currentCard.polish
      : currentCard.spanish;

    if (remainingCardsCount === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary">
                <h1 className="text-2xl font-bold mb-4 text-primary"></h1>
                <p className="text-lg">All done!</p>
                <Button variant="link" onClick={resetProgress} className="mt-4">
                    Reset Progress
                </Button>
            </div>
        );
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary">
      <h1 className="text-2xl font-bold mb-4 text-primary">FlashTarjetas</h1>

        <Select onValueChange={(value) => setSelectedSet(value as 'spoleczenstwoPracaPojecia' | 'technologiaTransportMiejsca' | 'domJedzenieCzasWolny')} defaultValue={selectedSet}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Flashcard Set" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="spoleczenstwoPracaPojecia">Społeczeństwo, Praca i Pojęcia</SelectItem>
                <SelectItem value="technologiaTransportMiejsca">Technologia, Transport i Miejsca</SelectItem>
                <SelectItem value="domJedzenieCzasWolny">Dom, Jedzenie i Czas Wolny</SelectItem>
            </SelectContent>
        </Select>

      <Select onValueChange={(value) => setLanguageSide(value as 'polish' | 'spanish')} defaultValue="polish">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="polish">Polish</SelectItem>
          <SelectItem value="spanish">Spanish</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full max-w-md mt-4">
        <Card className={`w-full h-48 transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          <CardContent
            className={`absolute inset-0 flex items-center justify-center p-6 backface-hidden cursor-pointer ${isFlipped ? 'bg-yellow-100' : ''}`}
            onClick={handleCardClick}
          >
            <div className="text-xl font-semibold unselectable">
              {displayedWord}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mt-4">
        <Button variant="outline" onClick={markAsDontKnow} className="bg-red-500 text-white hover:bg-red-700 unselectable">
          Don't know yet
        </Button>
        <Button onClick={markAsGotIt} className="bg-green-500 text-white hover:bg-green-700 unselectable">
          Got it
        </Button>
      </div>

      <div className="flex items-center mt-2">
        <Checkbox id="random" checked={isRandom} onChange={(e) => setIsRandom(e.target.checked)} />
        <label htmlFor="random" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
          Random
        </label>
      </div>

      <div className="mt-4 text-gray-600">Flashcards remaining: {remainingCardsCount}/{flashcards.length}</div>

      <Button variant="link" onClick={resetProgress} className="mt-4">
        Reset Progress
      </Button>

      <Dialog open={openAllWords} onOpenChange={setOpenAllWords}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">
            Show All Words
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>All Words</DialogTitle>
            <DialogDescription>
              Here's a list of all the words you're learning.
            </DialogDescription>
          </DialogHeader>
            <ScrollArea className="h-[300px]">
                <div className="grid gap-4 py-4">
                    {flashcards.map((card) => (
                        <div key={card.id} className="flex justify-between">
                            <span>{card.polish}</span>
                            <span>{card.spanish} {card.gotIt ? '✅' : ''}</span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
