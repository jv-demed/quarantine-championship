import styled from 'styled-components';
import { screens } from '@/assets/screens';
import { icons } from '@/assets/icons';
import { palette } from '@/assets/palette';
import { ConfrontDisclosure } from './ConfrontDisclosure';
import { useRouter } from 'next/navigation';

const Styled = styled.section`
    width: 100%;
    header{
        align-items: center;
        border-bottom: 1px solid ${palette.elements.divisorBorder};
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 10px;
        .arrow-icon{
            cursor: pointer;
        }
    }
    .confront-list{
        display: flex;
        flex-direction: column;
        gap: 10px;
        list-style: none;
    }
    @media(max-width: ${screens.mobile.px}){
        header{
            align-items: center;
            height: 50px;
            .arrow-icon{
                font-size: 1.4rem;
            }
        }
    }
`

export function Calendar({ infos, playerList, championList, gameData, current, setRound }){

    const router = useRouter();

    return(
        <Styled>
            <header>
                <icons.arrowLeft className='arrow-icon'
                    onClick={() => {
                        current > 1 && setRound(-1);
                    }}
                />
                <span onClick={() => router.push(`/registros/${infos.id}`)}>
                    Rodada {current}
                </span>
                <icons.arrowRight className='arrow-icon'
                    onClick={() => {
                        current < gameData.length && setRound(1);
                    }}
                />
            </header>
            <ul className='confront-list'>
                {gameData.map((round, i) => {
                    if(current == i+1){
                        return round.map((confront, i) => {
                            return(
                                <ConfrontDisclosure key={`c-${i+1}`}
                                    matchList={confront}
                                    playerList={playerList}
                                    championList={championList}
                                />
                            )
                        })
                    }
                })}
            </ul>
        </Styled>
    );
}