import React, { useState } from 'react'
import styled from 'styled-components'
import Card from './Card';

const Container = styled.div`
    flex: 2;
`;

const RecommendedVideos = () => {
    
  return (
    <Container>
        <Card type="sm" />
    </Container>
  )
}

export default RecommendedVideos
