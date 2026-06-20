import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem
} from "@mui/material";

import { useState } from "react";

export default function AddProjectModal({
    open,
    onClose,
    onSave
}) {

    const [form, setForm] =
        useState({
            project_name: "",
            description: "",
            platform: "ALL"
        });

    const handleSave = () => {

        onSave(form);

        setForm({
            project_name: "",
            description: "",
            platform: "ALL"
        });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>
                Add Project
            </DialogTitle>

            <DialogContent>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Project Name"
                    value={form.project_name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            project_name:
                                e.target.value
                        })
                    }
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    multiline
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description:
                                e.target.value
                        })
                    }
                />

                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Platform"
                    value={form.platform}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            platform:
                                e.target.value
                        })
                    }
                >
                    <MenuItem value="ALL">
                        ALL
                    </MenuItem>

                    <MenuItem value="UAT">
                        UAT
                    </MenuItem>

                    <MenuItem value="VSI">
                        VSI
                    </MenuItem>

                    <MenuItem value="CBE">
                        CBE
                    </MenuItem>

                    <MenuItem value="LOCAL">
                        LOCAL
                    </MenuItem>

                </TextField>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                >
                    Save
                </Button>

            </DialogActions>

        </Dialog>
    );
}