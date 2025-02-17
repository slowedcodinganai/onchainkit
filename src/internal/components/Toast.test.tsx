import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { Toast } from './Toast';

describe('Toast component', () => {
  it('should render bottom-right correctly', () => {
    const handleClose = vi.fn();
    const { getByTestId } = render(
      <Toast isVisible={true} position="bottom-right" onClose={handleClose}>
        <div>Test</div>
      </Toast>,
    );

    const toastContainer = getByTestId('ockToast');
    expect(toastContainer).toBeInTheDocument();
    expect(toastContainer).toHaveClass('bottom-5 left-3/4');

    const closeButton = getByTestId('ockCloseButton');
    expect(closeButton).toBeInTheDocument();
  });

  it('should render top-right correctly', () => {
    const handleClose = vi.fn();
    const { getByTestId } = render(
      <Toast isVisible={true} position="top-right" onClose={handleClose}>
        <div>Test</div>
      </Toast>,
    );

    const toastContainer = getByTestId('ockToast');
    expect(toastContainer).toBeInTheDocument();
    expect(toastContainer).toHaveClass('top-[100px] left-3/4');

    const closeButton = getByTestId('ockCloseButton');
    expect(closeButton).toBeInTheDocument();
  });

  it('should render top-center correctly', () => {
    const handleClose = vi.fn();
    const { getByTestId } = render(
      <Toast isVisible={true} position="top-center" onClose={handleClose}>
        <div>Test</div>
      </Toast>,
    );

    const toastContainer = getByTestId('ockToast');
    expect(toastContainer).toBeInTheDocument();
    expect(toastContainer).toHaveClass('top-[100px] left-2/4');

    const closeButton = getByTestId('ockCloseButton');
    expect(closeButton).toBeInTheDocument();
  });

  it('should render bottom-center correctly', () => {
    const handleClose = vi.fn();
    const { getByTestId } = render(
      <Toast isVisible={true} position="bottom-center" onClose={handleClose}>
        <div>Test</div>
      </Toast>,
    );

    const toastContainer = getByTestId('ockToast');
    expect(toastContainer).toBeInTheDocument();
    expect(toastContainer).toHaveClass('bottom-5 left-2/4');

    const closeButton = getByTestId('ockCloseButton');
    expect(closeButton).toBeInTheDocument();
  });

  it('should apply custom className correctly', () => {
    const handleClose = vi.fn();
    const { getByTestId } = render(
      <Toast
        isVisible={true}
        position="bottom-right"
        onClose={handleClose}
        className="custom-class"
      >
        <div>Test</div>
      </Toast>,
    );

    const toastContainer = getByTestId('ockToast');
    expect(toastContainer).toHaveClass('custom-class');
  });

  it('should not be visible when isVisible is false', () => {
    const handleClose = vi.fn();
    const { queryByTestId } = render(
      <Toast isVisible={false} position="bottom-right" onClose={handleClose}>
        <div>Test</div>
      </Toast>,
    );
    const toastContainer = queryByTestId('ockToast');
    expect(toastContainer).not.toBeInTheDocument();
  });

  it('should close when close button is clicked', () => {
    const handleClose = vi.fn();
    const { getByTestId } = render(
      <Toast isVisible={true} position="bottom-right" onClose={handleClose}>
        <div>Test</div>
      </Toast>,
    );

    const closeButton = getByTestId('ockCloseButton');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('should render children correctly', () => {
    const handleClose = vi.fn();
    const { getByText } = render(
      <Toast isVisible={true} position="bottom-right" onClose={handleClose}>
        <div>Test</div>
      </Toast>,
    );

    const text = getByText('Test');
    expect(text).toBeInTheDocument();
  });

  it('should disappear after durationMs', async () => {
    vi.useFakeTimers();
    const handleClose = vi.fn();
    const durationMs = 2000;

    render(
      <Toast
        isVisible={true}
        position="bottom-right"
        onClose={handleClose}
        durationMs={durationMs}
      >
        <div>Test</div>
      </Toast>,
    );

    expect(handleClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(durationMs);

    expect(handleClose).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('should not fire timer after manual close', () => {
    vi.useFakeTimers();
    const handleClose = vi.fn();
    const durationMs = 2000;

    const { getByTestId, rerender } = render(
      <Toast
        isVisible={true}
        position="bottom-right"
        onClose={handleClose}
        durationMs={durationMs}
      >
        <div>Test</div>
      </Toast>,
    );

    vi.advanceTimersByTime(1000);

    const closeButton = getByTestId('ockCloseButton');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);

    rerender(
      <Toast
        isVisible={false}
        position="bottom-right"
        onClose={handleClose}
        durationMs={durationMs}
      >
        <div>Test</div>
      </Toast>,
    );

    vi.advanceTimersByTime(1500);
    expect(handleClose).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('should cleanup correctly on unmount', () => {
    vi.useFakeTimers();
    const handleClose = vi.fn();

    const { unmount } = render(
      <Toast
        isVisible={true}
        position="bottom-right"
        onClose={handleClose}
        durationMs={2000}
      >
        <div>Test</div>
      </Toast>,
    );

    unmount();
    vi.advanceTimersByTime(2000);

    expect(handleClose).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
