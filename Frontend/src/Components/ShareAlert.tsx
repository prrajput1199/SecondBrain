import Swal from 'sweetalert2';

const showShareAlert = (hash: string) => {
    const shareLink = `https://second-brain-frontend-iota.vercel.app/brain/share/${hash}`;

    Swal.fire({
        title: '🔗 Share Your Brain!',
        html: `Copy your link below:<br><br><code>${shareLink}</code>`,
        icon: 'success',
        confirmButtonText: 'Copy Link',
        showCloseButton: true,
        didOpen: () => {
            navigator.clipboard.writeText(shareLink);
        }
    });
};

export default showShareAlert;
