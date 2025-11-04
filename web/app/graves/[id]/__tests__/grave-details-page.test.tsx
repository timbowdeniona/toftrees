import { render, screen } from '@testing-library/react';
import GraveDetailsPageClient from '../grave-details-page';
import { Grave } from '../../../../types';

describe('GraveDetailsPageClient', () => {
  const mockGraveWithInscription: Grave = {
    _id: '1',
    graveNo: 1,
    familySurname: 'Smith',
    persons: [],
    locationDescription: 'test location',
    headstoneImage: null,
    headstoneVideo: null,
    graveyardLocation: null,
    inscription: [
      {
        _key: '123',
        _type: 'block',
        children: [
          {
            _key: '456',
            _type: 'span',
            marks: [],
            text: 'This is an inscription.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
  };

  const mockGraveWithoutInscription: Grave = {
    _id: '2',
    graveNo: 2,
    familySurname: 'Jones',
    persons: [],
    locationDescription: 'test location 2',
    headstoneImage: null,
    headstoneVideo: null,
    graveyardLocation: null,
    inscription: null,
  };

  it('should render the inscription text when an inscription is present', () => {
    render(<GraveDetailsPageClient grave={mockGraveWithInscription} />);
    const inscriptionText = screen.getByText('This is an inscription.');
    expect(inscriptionText).toBeInTheDocument();
  });

  it('should not render the inscription section when no inscription is present', () => {
    render(<GraveDetailsPageClient grave={mockGraveWithoutInscription} />);
    const inscriptionHeading = screen.queryByRole('heading', { name: /inscription/i });
    expect(inscriptionHeading).not.toBeInTheDocument();
  });
});