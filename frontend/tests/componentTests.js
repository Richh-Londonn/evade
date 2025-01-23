import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
    it('should render the navbar with links', () => {
        const { getByText } = render(<Navbar />);
        expect(getByText('Evade')).toBeInTheDocument();
    });
});
