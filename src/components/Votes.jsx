import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    
    gap: 40px;


`


export default function Votes(room){
    
    console.log(room);
    
    return (
        <Wrapper>
        
            <h>{room.value.enterTIme}</h>
            
           <h> {room.value.hotColdScore}</h>

           <h> {room.value.insideCongestionScore}</h>

           <h> {room.value.outdoorHumidity}</h>

          <h>  {room.value.outdoorTemperature}</h>

           <h> {room.value.voteId}</h>

           <h> {room.value.voteTime}</h>


     </Wrapper>

    )
}